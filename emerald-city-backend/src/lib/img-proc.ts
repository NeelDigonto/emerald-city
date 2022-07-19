import sharp from 'sharp';

export const compressTexture = async (
  ifile: string,
  ofile: string,
  quality: number,
) => {
  return sharp(
    await sharp(ifile)
      .pipelineColourspace('srgb')
      .toColourspace('srgb')
      .toBuffer(),
  )
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
    .toFile(ofile);
};

export const multiplyTexture = async (
  albedo: string,
  ao: string,
  pmaaao: string,
) => {
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
    .toFile(pmaaao);
};
