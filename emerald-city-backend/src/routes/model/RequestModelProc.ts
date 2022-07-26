import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import { api, db } from '../../types/api/Core.js';
import { s3 } from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';

export async function RequestImageProc(req, res) {
  const requestModelProc: api.RequestModelProc =
    req.body as api.RequestModelProc;

  const bucket: string = 'emerald-city';
  const region: string = 'ap-south-1';

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.Model);

  const modelDB: api.Model = {
    type: api.ModelType.FBX,
    file: {
      bucket,
      key: `models/${requestModelProc.modelName}/model.fbx`,
      byteLength: 0,
    },
  };

  collection.insertOne(modelDB);

  res.end();
}
