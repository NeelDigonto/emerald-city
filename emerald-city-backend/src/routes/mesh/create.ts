import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import * as api from '../../types/api/Core.js';

import * as s3 from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function CreateMesh(req, res) {
  const requestMeshProc: api.RequestMeshProc = req.body as api.RequestMeshProc;

  const bucket = 'emerald-city';
  const region = 'ap-south-1';

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(api.Table.ImportedMesh);

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
