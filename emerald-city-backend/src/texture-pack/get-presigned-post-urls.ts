import { S3ClientConfig, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { TextureUploadParams } from '../types/api/Core.js';

export async function GetPresignedPostUrls(req, res) {
  const textureUploadParams: TextureUploadParams =
    req.body as TextureUploadParams;

  const bucketName: string = 'emerald-city';
  const s3ClientConfig: S3ClientConfig = { region: 'ap-south-1' };
  const s3Client = new S3Client(s3ClientConfig);
  const Fields = {
    acl: 'public-read',
  };
  const texturePackName = textureUploadParams.texturePackName;
  const resObj = { texturePackName };

  await Promise.all(
    Object.entries(textureUploadParams).map(async ([key, value]) => {
      if (key === 'texturePackName' || value === false) return;

      const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: bucketName,
        Key: `textures/${texturePackName}/${key}.jpg`,
        Fields,
        Expires: 10 * 60, //Seconds before the presigned post expires. 3600 by default.
      });

      resObj[key] = { url, fields };
    }),
  );

  res.send(resObj);
}
