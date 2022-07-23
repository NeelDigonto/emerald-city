import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { response } from 'express';
import fs, { write } from 'fs';
import { Readable } from 'stream';

export namespace s3 {
  export async function getObject(
    bucket: string,
    region: string,
    key: string,
  ): Promise<Readable> {
    const client = new S3Client({ region: region, apiVersion: '2006-03-01' });
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await client.send(command);
    return response.Body as Readable;
  }

  export async function putObject(
    bucket: string,
    region: string,
    key: string,
    file: Readable | Buffer,
  ) {
    const client = new S3Client({ region: region, apiVersion: '2006-03-01' });
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
    });
    return client.send(command);
  }

  export async function getPresignedGetUrl(
    bucket: string,
    region: string,
    key: string,
    expires: number = 10 * 60,
  ) {
    const client = new S3Client({ region: region, apiVersion: '2006-03-01' });
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const url = await getSignedUrl(client, command, { expiresIn: expires });
    return url;
  }

  export async function getPresignedPostUrl(
    bucket: string,
    region: string,
    key: string,
    expires: number = 10 * 60,
  ) {
    const Fields = {
      acl: 'public-read',
    };
    const client = new S3Client({ region: region, apiVersion: '2006-03-01' });
    return createPresignedPost(client, {
      Bucket: bucket,
      Key: key,
      Fields,
      Expires: expires,
    });
  }
}
