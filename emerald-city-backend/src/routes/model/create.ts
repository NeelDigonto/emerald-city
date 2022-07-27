import { api, db } from '../../types/api/Core.js';
import { getMongoConnection } from '../../util/db.js';

export async function CreateModel(req, res) {
  const body = req.body as Omit<api.Model, 'id'>;

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.Model);

  const insertResult = await collection.insertOne(body);

  res.send({ id: insertResult.insertedId });
}
