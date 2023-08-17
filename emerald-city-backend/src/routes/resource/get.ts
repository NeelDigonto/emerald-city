import { DB_NAME } from '../../Constants.js';
import * as db from '../../types/api/Core.js';
import { getMongoConnection } from '../../util/db.js';

export async function GetResourceTable(req, res) {
  const { rname } = req.params;

  const connection = await getMongoConnection();
  const collection = connection.db(DB_NAME).collection(rname);

  const findResult: any[] = await collection.find({}).toArray();

  const falttenedResult = findResult.map((document) => {
    const ret = { ...document, id: document._id.toString() };
    delete ret._id;
    return ret;
  });

  res.send(falttenedResult);

  await connection.close();
}
