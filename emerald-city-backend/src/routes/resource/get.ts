import { db } from '../../types/api/Core.js';
import { getMongoConnection } from '../../util/db.js';

export async function GetResourceTable(req, res) {
  const { rname } = req.params;

  const connection = await getMongoConnection();
  const collection = connection.db(process.env.DB_NAME).collection(rname);

  const findResult: any[] = await collection.find({}).toArray();
  connection.close();

  const falttenedResult = findResult.map((document) => {
    const ret = { ...document, id: document._id.toString() };
    delete ret._id;
    return ret;
  });

  res.send(falttenedResult);
}
