import express from 'express';
import cors from 'cors';
import { getMongoConnection } from './util/db.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

console.log(process.env.S3_BUCKET);

app.post('/get-presigned-post-urls', (req, res) => {
  res.send({ wow: 'meow' });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
