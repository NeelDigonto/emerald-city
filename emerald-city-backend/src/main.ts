import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getMongoConnection } from './util/db.js';
import { func1 } from './util/image-proc.js';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import fs from 'fs';

import { GetPresignedPostUrls } from './routes/GetPresignedPostUrls.js';
import { RequestImageProc } from './routes/texture-pack/RequestImageProc.js';
import { db } from './types/api/Core.js';
import { GetResourceTable } from './routes/resource/get.js';
import { CreateMaterial } from './routes/material/create.js';
import { RequestModelProc } from './routes/model/RequestModelProc.js';
import { CreateModel } from './routes/model/create.js';

const app = express();
app.use(cors());

app.post('/get-presigned-post-url', express.json(), GetPresignedPostUrls);

app.post('/texture-pack/request-img-proc', express.json(), RequestImageProc);

app.get('/resource/get/:rname', express.json(), GetResourceTable);

app.post('/material/create', express.json(), CreateMaterial);

app.post('/model/request-model-proc', express.json(), RequestModelProc);

app.post('/model/create', express.json(), CreateModel);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
