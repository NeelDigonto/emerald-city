import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
