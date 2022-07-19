import sharp from 'sharp';

export async function func1() {
  const img = sharp('assets/normal.jpg');

  const processedImg = img
    //.toColourspace('srgb')
    .resize(1024)
    .pipelineColorspace('linear')
    .toColorspace('linear')
    .jpeg({ quality: 10 });
  console.log(await processedImg.toBuffer().then((buffer) => buffer));
  await processedImg.toFile('assets/__normal.jpg');

  const metadata = await sharp('assets/__normal.jpg').metadata();
  console.log(metadata);
}

async function func2() {
  const img = sharp('assets/normal.jpg');
  const metadata = await img.metadata();
  console.log(metadata);
  const processedImg = img.resize(1024).jpeg({ quality: 100 });
  console.log(
    await processedImg.toBuffer().then((buffer) => buffer.byteLength),
  );
  processedImg.toFile('assets/__normal.jpg');
}

//func1();
//func2();
