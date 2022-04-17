import sharp from 'sharp';
import path from 'path';

const imageResizer = async (
  filename: string,
  width: string,
  height: string,
  outputPath: string
) => {
  const inputPath = path.join(__dirname, '..', '..', 'my-images', filename);
  await sharp(inputPath)
    .resize({
      width: parseInt(width as string),
      height: parseInt(height as string),
    })
    .toFile(outputPath)
    .then(() => {
      console.log(`
Done ......
Image ${filename} is resized to ${width} x ${height}`);
      return true;
    })
    .catch((err) => console.log(err));
};

export default imageResizer;
