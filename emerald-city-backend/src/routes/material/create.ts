import * as api from '../../types/api/Core.js';

import { getMongoConnection } from '../../util/db.js';

export async function CreateMaterial(req, res) {
  const body = req.body as Omit<api.Material, 'id'>;

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(api.Table.Material);

  const insertResult = await collection.insertOne(body);

  res.send({ id: insertResult.insertedId });

  await connection.close();
}
