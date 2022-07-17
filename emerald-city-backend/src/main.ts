import express from 'express';
import { getMongoConnection } from './util/db.js';

const app = express();

app.post('/get-presigned-post-urls', (req, res) => {});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
