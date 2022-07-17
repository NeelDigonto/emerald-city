/* import express from 'express';
import { getMongoConnection } from './util/db.js';
const app = express();
app.get('/', async (_req, res) => {
  res.send('Hello World!');

  const connection = await getMongoConnection();
  const collection = connection.db('development').collection('user');
  collection.insertMany([
    { test: { wow: 'meow' } },
    { sudip: 'muriwala' },
    { saikat: 'jhawuwala' },
  ]);
});

app.get('/find', async (_req, res) => {
  const connection = await getMongoConnection();
  const collection = connection.db('development').collection('user');

  const result = await collection.findOne({ sudip: 'muriwala' }); //.toArray();
  res.send(`<pre>${JSON.stringify(result, null, 2)}</pre>`);
  //res.send(result);
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
 */

import sharp from 'sharp';
