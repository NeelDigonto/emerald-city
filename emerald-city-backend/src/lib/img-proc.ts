import { Readable } from 'form-data';
import sharp from 'sharp';
import { s3 } from '../util/aws-wrapper.js';
import { stream2buffer } from './core.js';

export const compressTexture = async (ifile: Buffer, quality: number) => {
  return sharp(ifile)
    .pipelineColourspace('srgb')
    .toColourspace('srgb')
    .resize(1024)
    .jpeg({
      quality: quality,
      progressive: true,
      chromaSubsampling: '4:4:4',
      optimiseCoding: true,
      quantisationTable: 4,
      trellisQuantisation: false,
      overshootDeringing: true,
      optimiseScans: true,
      force: true,
    })
    .toBuffer();
};

export const multiplyTexture = async (albedo: Buffer, ao: Buffer) => {
  return sharp(albedo)
    .pipelineColorspace('linear')
    .composite([
      {
        input: await sharp(ao)
          .pipelineColourspace('srgb')
          .toColourspace('srgb')
          .toBuffer(),
        blend: 'multiply',
        gravity: 'center',
      },
    ])
    .toColorspace('srgb')
    .jpeg({
      quality: 100,
      progressive: false,
      chromaSubsampling: '4:4:4',
      optimiseCoding: true,
      quantisationTable: 4,
      trellisQuantisation: false,
      overshootDeringing: true,
      optimiseScans: true,
    })

    .toBuffer();
};
