import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import * as api from '../../types/api/Core.js';

import * as s3 from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import { DB_NAME } from '../../Constants.js';

export async function UpdateModel(req, res) {
  const model: api.Model = req.body;
  const id = model.id;
  delete model.id;

  const connection = await getMongoConnection();
  const collection = connection.db(DB_NAME).collection(api.Table.Model);

  const updateResult = await collection.updateOne(
    {
      _id: new ObjectId(id),
    },
    { $set: model },
  );

  console.log(updateResult);

  res.send(updateResult);

  await connection.close();
}
