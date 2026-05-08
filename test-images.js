const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

async function testImage(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const stats = fs.statSync(imagePath);
    
    console.log(`\n📸 ${path.relative(PUBLIC_IMAGES_DIR, imagePath)}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`   Format: ${metadata.format}`);
    
    if (metadata.width > 1920 || metadata.height > 1920) {
      console.log(`   ⚠️  EXCEEDS 1920px limit!`);
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  const testImages = [
    path.join(PUBLIC_IMAGES_DIR, 'MainPage', '001_0000.webp'),
    path.join(PUBLIC_IMAGES_DIR, 'roadmap-stages', 'roadmap-1.png'),
  ];
  
  console.log('📊 Testing image dimensions and formats...\n');
  
  for (const img of testImages) {
    if (fs.existsSync(img)) {
      await testImage(img);
    } else {
      console.log(`❌ File not found: ${img}`);
    }
  }
}

main().catch(console.error);