import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
const __dirname = path.resolve();

import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { getMongoConnection } from './util/db.js';
import { func1 } from './util/image-proc.js';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import { GetPresignedPostUrl } from './routes/GetPresignedPostUrl.js';
import { GetPresignedGetUrl } from './routes/GetPresignedGetUrl.js';

import { RequestImageProc } from './routes/texture-pack/RequestImageProc.js';
import { GetResourceTable } from './routes/resource/get.js';
import { CreateMaterial } from './routes/material/create.js';
import { CreateMesh } from './routes/mesh/create.js';
import { CreateModel } from './routes/model/create.js';
import { GameServer } from './GameServer.js';
import { GetSceneGraph } from './routes/sceneGraph/get.js';
import { UpdateSceneGraph } from './routes/sceneGraph/udpate.js';
import { UpdateModel } from './routes/model/update.js';
import { UpdateMaterial } from './routes/material/updateMaterial.js';
import { audioServer } from './WebRTCAudioServer.js';
import {
  getObject,
  getPresignedGetUrl,
  getPresignedPostUrl,
} from './util/aws-wrapper.js';
import { AWS_S3_BUCKET, AWS_S3_REGION } from './Constants.js';

function frontendServer() {
  const app = express();

  app.use(
    express.static(
      path.join(__dirname, '..', 'emerald-city-frontend', 'build'),
    ),
  );

  app.get('/*', function (req, res) {
    res.sendFile(
      path.join(
        __dirname,
        '..',
        'emerald-city-frontend',
        'build',
        'index.html',
      ),
    );
  });

  app.listen(8080);
}

function mainBackendServer() {
  const app = express();
  app.use(cors());

  app.post('/api/get-presigned-get-url', express.json(), GetPresignedGetUrl);

  app.post('/api/get-presigned-post-url', express.json(), GetPresignedPostUrl);

  app.post(
    '/api/texture-pack/request-img-proc',
    express.json(),
    RequestImageProc,
  );

  app.get('/api/resource/get/:rname', express.json(), GetResourceTable);

  app.post('/api/material/create', express.json(), CreateMaterial);

  app.post('/api/material/update', express.json(), UpdateMaterial);

  app.post('/api/mesh/create', express.json(), CreateMesh);

  app.post('/api/model/create', express.json(), CreateModel);

  app.post('/api/model/update', express.json(), UpdateModel);

  app.get('/api/sceneGraph/get', express.json(), GetSceneGraph);

  app.post('/api/sceneGraph/update', express.json(), UpdateSceneGraph);

  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
}

function main() {
  const command = process.argv[2];

  switch (command) {
    case 'frontend':
      frontendServer();
      break;
    case 'backend':
      mainBackendServer();
      break;
    case 'game':
      //new GameServer();
      break;
    case 'audio':
      //audioServer();
      break;
    default:
      mainBackendServer();
      //new GameServer();
      //audioServer();
      break;
  }
}

main();
/*
import FormData from 'form-data';
import axios from 'axios';

export const uploadFile = async (url: string, fields: any, file: Buffer) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  formData.append('file', file);
  //console.log(fields);

  return new Promise<void>((resolve, reject) => {
    axios.post(url, formData).then(() => resolve());

    //resolve();
  });
};

const res = await getPresignedPostUrl(
  AWS_S3_BUCKET,
  AWS_S3_REGION,
  'vfvndhsga_Preview.png',
);
//console.log(res);
const ures = await uploadFile(
  res.url,
  res.fields,
  fs.readFileSync('vfvndhsga_Preview.png'),
);
console.log(ures);
//console.log(fs.readFileSync('vfvndhsga_Preview.png')); */
