import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getMongoConnection } from './util/db.js';
import { func1 } from './util/image-proc.js';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import fs from 'fs';

import { GetPresignedPostUrl } from './routes/GetPresignedPostUrl.js';
import { GetPresignedGetUrl } from './routes/GetPresignedGetUrl.js';

import { RequestImageProc } from './routes/texture-pack/RequestImageProc.js';
import { GetResourceTable } from './routes/resource/get.js';
import { CreateMaterial } from './routes/material/create.js';
import { CreateMesh } from './routes/mesh/create.js';
import { CreateModel } from './routes/model/create.js';

const app = express();
app.use(cors());

app.post('/get-presigned-get-url', express.json(), GetPresignedGetUrl);

app.post('/get-presigned-post-url', express.json(), GetPresignedPostUrl);

app.post('/texture-pack/request-img-proc', express.json(), RequestImageProc);

app.get('/resource/get/:rname', express.json(), GetResourceTable);

app.post('/material/create', express.json(), CreateMaterial);

app.post('/mesh/create', express.json(), CreateMesh);

app.post('/model/create', express.json(), CreateModel);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});

const args = process.argv.slice(0);
console.log(args);
