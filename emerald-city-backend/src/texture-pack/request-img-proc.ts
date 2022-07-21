import { S3ClientConfig, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { compressTexture, multiplyTexture } from '../lib/img-proc.js';
import {
  TextureUploadedParams,
  TextureUploadParams,
} from '../types/api/Core.js';

export async function RequestImageProc(req, res) {
  const textureUploadedParams: TextureUploadedParams =
    req.body as TextureUploadedParams;

  const bucketName: string = 'emerald-city';
  const s3ClientConfig: S3ClientConfig = { region: 'ap-south-1' };
  const s3Client = new S3Client(s3ClientConfig);
  const Fields = {
    acl: 'public-read',
  };

  const albedoFile: string = 'assets/albedo.jpg';
  const aoFile: string = 'assets/ao.jpg';
  const normalFile: string = 'assets/normal.jpg';
  const roughnessFile: string = 'assets/roughness.jpg';
  const metalnessFile: string = 'assets/metalness.jpg';
  const pmaaaoFile: string = 'assets/pmaaao.jpg';

  const albedoCompressedFile: string = 'assets/albedo_compressed.jpg';
  const aoCompressedFile: string = 'assets/ao_compressed.jpg';
  const normalCompressedFile: string = 'assets/normal_compressed.jpg';
  const roughnessCompressedFile: string = 'assets/roughness_compressed.jpg';
  const metalnessCompressedFile: string = 'assets/metalness_compressed.jpg';
  const pmaaoCompressedFile: string = 'assets/pmaaao_compressed.jpg';

  const hasAlbedo: boolean =
    textureUploadedParams.albedo !== undefined ||
    textureUploadedParams.albedo === '';
  const hasAO: boolean =
    textureUploadedParams.ao !== undefined || textureUploadedParams.ao === '';
  const hasNormal: boolean =
    textureUploadedParams.normal !== undefined ||
    textureUploadedParams.normal === '';
  const hasRoughness: boolean =
    textureUploadedParams.roughness !== undefined ||
    textureUploadedParams.roughness === '';
  const hasMetalness: boolean =
    textureUploadedParams.metalness !== undefined ||
    textureUploadedParams.metalness === '';

  if (hasAlbedo) {
    compressTexture(albedoFile, albedoCompressedFile, 70);
  }
  if (hasNormal) compressTexture(normalFile, normalCompressedFile, 90);
  if (hasRoughness) compressTexture(roughnessFile, roughnessCompressedFile, 60);
  if (hasMetalness) compressTexture(metalnessFile, metalnessCompressedFile, 60);
  if (hasAO) compressTexture(aoFile, aoCompressedFile, 60);
  if (hasAlbedo && hasAO) {
    multiplyTexture(albedoFile, aoFile, pmaaaoFile).then(() =>
      compressTexture(pmaaaoFile, pmaaoCompressedFile, 70),
    );
  }
}
