import { Readable } from 'stream';
import { compressorUtil, stream2buffer } from '../../lib/core.js';
import { compressTexture, multiplyTexture } from '../../lib/img-proc.js';
import { api, db } from '../../types/api/Core.js';
import { s3 } from '../../util/aws-wrapper.js';
import { getMongoClient, getMongoConnection } from '../../util/db.js';

export async function RequestImageProc(req, res) {
  const requestImageProc: api.RequestImageProc =
    req.body as api.RequestImageProc;

  const bucket: string = 'emerald-city';
  const region: string = 'ap-south-1';

  const hasAlbedo: boolean = requestImageProc.albedo;
  const hasAO: boolean = requestImageProc.ao;
  const hasNormal: boolean = requestImageProc.normal;
  const hasRoughness: boolean = requestImageProc.roughness;
  const hasMetalness: boolean = requestImageProc.metalness;

  let albedoFile: Buffer | null = null;
  let aoFile: Buffer | null = null;

  const texturePackDB: Omit<db.TexturePack, 'id'> = {
    texturePackName: requestImageProc.texturePackName,
  };

  if (hasAlbedo)
    albedoFile = await compressorUtil(
      requestImageProc.texturePackName,
      'albedo',
      70,
      bucket,
      region,
      texturePackDB,
    );

  if (hasAO)
    aoFile = await compressorUtil(
      requestImageProc.texturePackName,
      'ao',
      60,
      bucket,
      region,
      texturePackDB,
    );

  if (hasNormal)
    await compressorUtil(
      requestImageProc.texturePackName,
      'normal',
      90,
      bucket,
      region,
      texturePackDB,
    );

  if (hasRoughness)
    await compressorUtil(
      requestImageProc.texturePackName,
      'roughness',
      60,
      bucket,
      region,
      texturePackDB,
    );

  if (hasMetalness)
    await compressorUtil(
      requestImageProc.texturePackName,
      'metalness',
      60,
      bucket,
      region,
      texturePackDB,
    );
  //put db uploads here too
  if (hasAlbedo && hasAO) {
    await multiplyTexture(albedoFile, aoFile).then(async (pmaaaoFile) => {
      s3.putObject(
        bucket,
        region,
        `textures/${requestImageProc.texturePackName}/pmaaao.jpg`,
        pmaaaoFile,
      );

      const fileCompressed = await compressTexture(pmaaaoFile, 70);

      await s3.putObject(
        bucket,
        region,
        `textures/${requestImageProc.texturePackName}/pmaaao_compressed.jpg`,
        fileCompressed,
      );

      texturePackDB.pmaaao = {
        bucket: 'emerald-city',
        key: `textures/${requestImageProc.texturePackName}/pmaaao.jpg`,
        byteLength: pmaaaoFile.byteLength,
      };

      texturePackDB.pmaaaoCompressed = {
        bucket: 'emerald-city',
        key: `textures/${requestImageProc.texturePackName}/pmaaao_compressed.jpg`,
        byteLength: fileCompressed.byteLength,
      };
    });
  }

  const connection = await getMongoConnection();
  const collection = connection
    .db(process.env.DB_NAME)
    .collection(db.Table.TexturePack);

  collection.insertOne(texturePackDB);
  res.end();
}