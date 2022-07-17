import sharp from 'sharp';

async function func1() {
  const img = sharp('assets/normal.jpg');
  const metadata = await img.metadata();
  console.log(metadata);
  const processedImg = img
    //.toColourspace('srgb')
    .resize(1024)
    .jpeg({ quality: 100 });
  console.log(await processedImg.toBuffer().then((buffer) => buffer));
  processedImg.toFile('assets/__normal.jpg');
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
