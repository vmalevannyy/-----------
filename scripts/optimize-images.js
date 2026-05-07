const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_DIMENSION = 2400;
const QUALITY = 80;

// Recursively get all image files
function findImageFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(findImageFiles(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  
  return results;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Process single image
async function processImage(imagePath) {
  try {
    const ext = path.extname(imagePath);
    const outputPath = imagePath.replace(ext, '.webp');
    
    // Skip if webp already exists and is newer than original
    if (fs.existsSync(outputPath)) {
      const originalStat = fs.statSync(imagePath);
      const webpStat = fs.statSync(outputPath);
      if (webpStat.mtime > originalStat.mtime) {
        console.log(`⏭️  Skipped (already optimized): ${path.relative(PUBLIC_IMAGES_DIR, imagePath)}`);
        return null;
      }
    }
    
    const originalSize = fs.statSync(imagePath).size;
    
    // Get image metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Calculate resize dimensions
    let resizeOptions = null;
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      const width = metadata.width > metadata.height ? MAX_DIMENSION : null;
      const height = metadata.height > metadata.width ? MAX_DIMENSION : null;
      resizeOptions = { width, height, fit: 'inside', withoutEnlargement: true };
    }
    
    // Process image
    let pipeline = image;
    if (resizeOptions) {
      pipeline = pipeline.resize(resizeOptions);
    }
    
    await pipeline
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.relative(PUBLIC_IMAGES_DIR, imagePath)} → ${path.relative(PUBLIC_IMAGES_DIR, outputPath)}`);
    console.log(`   Original: ${formatBytes(originalSize)} → WebP: ${formatBytes(newSize)} (${savings}% smaller)`);
    
    return { originalSize, newSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Error processing ${imagePath}:`, error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Scanning: ${PUBLIC_IMAGES_DIR}\n`);
  
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.error(`❌ Directory not found: ${PUBLIC_IMAGES_DIR}`);
    process.exit(1);
  }
  
  const imageFiles = findImageFiles(PUBLIC_IMAGES_DIR);
  console.log(`📊 Found ${imageFiles.length} images to process\n`);
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let processed = 0;
  let skipped = 0;
  
  for (const imagePath of imageFiles) {
    const result = await processImage(imagePath);
    if (result === null) {
      skipped++;
    } else {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      processed++;
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Processed: ${processed} images`);
  console.log(`⏭️  Skipped: ${skipped} images`);
  console.log(`📦 Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`📦 Total new size: ${formatBytes(totalNewSize)}`);
  console.log(`💾 Total savings: ${formatBytes(totalOriginalSize - totalNewSize)} (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);