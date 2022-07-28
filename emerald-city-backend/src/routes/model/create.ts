import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import { api, db } from '../../types/api/Core.js';
import { s3 } from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function CreateModel(req, res) {
  type tt = Omit<api.Model, 'id'>;
  const modeCreateReq: tt = req.body as tt;

  const bucket: string = 'emerald-city';
  const region: string = 'ap-south-1';

  const connection = await getMongoConnection();
  let collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.Model);

  const modelDB: tt = {
    name: modeCreateReq.name,
    type: modeCreateReq.type,
    importedMeshID: modeCreateReq.importedMeshID,
    materialID: modeCreateReq.materialID,
    primitiveMeshType: modeCreateReq.primitiveMeshType,
  };

  await collection.insertOne(modelDB);

  res.end();

  await connection.close();
}
