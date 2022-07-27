import { Readable, Stream } from 'stream';
import { db } from '../types/api/Core.js';
import { s3 } from '../util/aws-wrapper.js';
import { compressTexture } from './img-proc.js';

export async function stream2buffer(
  stream: Readable | Stream,
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
}

export const compressorUtil = async (
  texturePackName: string,
  fname: string,
  quality: number,
  bucket: string,
  region: string,
  texturePackDB: db.TexturePack | Omit<db.TexturePack, 'id'>,
): Promise<Buffer> => {
  const file = await stream2buffer(
    await s3.getObject(
      bucket,
      region,
      `textures/${texturePackName}/${fname}.jpg`,
    ),
  );

  const fileCompressed = await compressTexture(file, quality);

  s3.putObject(
    bucket,
    region,
    `textures/${texturePackName}/${fname}_compressed.jpg`,
    fileCompressed,
  );

  texturePackDB[fname] = {
    bucket,
    key: `textures/${texturePackName}/${fname}.jpg`,
    byteLength: file.byteLength,
  };

  texturePackDB[`${fname}Compressed`] = {
    bucket,
    key: `textures/${texturePackName}/${fname}_compressed.jpg`,
    byteLength: fileCompressed.byteLength,
  };

  return file;
};
