import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import * as api from '../../types/api/Core.js';

import * as s3 from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function UpdateSceneGraph(req, res) {
  const rootSceneObject: api.DBSceneObject = req.body;

  const bucket = 'emerald-city';
  const region = 'ap-south-1';

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(api.Table.SceneGraph);

  await collection.deleteMany({});
  const insertResult = await collection.insertOne(rootSceneObject);

  res.send({ id: insertResult.insertedId });

  await connection.close();
}
