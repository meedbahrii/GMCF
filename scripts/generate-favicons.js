import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [16, 32, 180];
const inputImage = join(__dirname, '..', 'public', 'logo.png');
const outputDir = join(__dirname, '..', 'public', 'icons', 'favicons');

async function generateFavicons() {
  try {
    // Generate PNG favicons
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));

      // Generate WebP version
      await sharp(inputImage)
        .resize(size, size)
        .webp({ quality: 90 })
        .toFile(path.join(outputDir, `favicon-${size}x${size}.webp`));
    }

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();