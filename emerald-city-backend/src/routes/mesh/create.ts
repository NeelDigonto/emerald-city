import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import { api, db } from '../../types/api/Core.js';
import { s3 } from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function CreateMesh(req, res) {
  const requestMeshProc: api.RequestMeshProc = req.body as api.RequestMeshProc;

  const bucket: string = 'emerald-city';
  const region: string = 'ap-south-1';

  const connection = await getMongoConnection();
  let collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.ImportedMesh);

  const meshDB: Omit<api.ImportedMesh, 'id'> = {
    type: api.ImportedMeshType.FBX,
    name: requestMeshProc.name,
    file: {
      fuuid: uuidv4(),
      bucket,
      key: `meshes/${requestMeshProc.name}.fbx`,
      byteLength: requestMeshProc.bytelength,
    },
  };

  const insertedId = (await collection.insertOne(meshDB)).insertedId.toString();

  res.end();

  await connection.close();
}
