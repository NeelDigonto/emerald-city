import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getMongoConnection } from './util/db.js';
import { func1 } from './util/image-proc.js';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import fs from 'fs';
import {
  TextureUploadedParams,
  TextureUploadParams,
} from './types/api/Core.js';
import { GetPresignedPostUrls } from './texture-pack/get-presigned-post-urls.js';
import { RequestImageProc } from './texture-pack/request-img-proc.js';

const app = express();
app.use(cors());

app.post(
  '/texture-pack/get-presigned-post-urls',
  express.json(),
  GetPresignedPostUrls,
);

app.post('/texture-pack/request-img-proc', express.json(), RequestImageProc);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
