import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import * as api from '../../types/api/Core.js';

import * as s3 from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function UpdateMaterial(req, res) {
  const material: api.Material = req.body;
  const id = material.id;
  delete material.id;

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(api.Table.Material);

  const updateResult = await collection.updateOne(
    {
      id: id,
    },
    { $set: material },
  );

  res.send({ status: 'ok' });

  await connection.close();
}
