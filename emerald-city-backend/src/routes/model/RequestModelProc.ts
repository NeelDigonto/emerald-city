import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import { api, db } from '../../types/api/Core.js';
import { s3 } from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function RequestModelProc(req, res) {
  const requestModelProc: api.RequestModelProc =
    req.body as api.RequestModelProc;

  const bucket: string = 'emerald-city';
  const region: string = 'ap-south-1';

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.ImportedModel);

  const modelDB: Omit<api.ImportedModel, 'id'> = {
    type: api.ImportedModelType.FBX,
    name: requestModelProc.modelName,
    file: {
      fuuid: uuidv4(),
      bucket,
      key: `models/${requestModelProc.modelName}/model.fbx`,
      byteLength: 0,
    },
  };

  await collection.insertOne(modelDB);

  res.end();

  await connection.close();
}
