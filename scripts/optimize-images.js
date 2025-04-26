const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OPTIMIZED_DIR = path.join(process.cwd(), 'public/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Get all image files from public directory
const imageFiles = fs.readdirSync(PUBLIC_DIR)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

// Process each image
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const outputPath = path.join(OPTIMIZED_DIR, file);
    const webpPath = path.join(OPTIMIZED_DIR, `${file.split('.')[0]}.webp`);
    
    // Skip directories
    if (fs.statSync(inputPath).isDirectory()) continue;
    
    try {
      // Generate responsive sizes
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Create WebP version (better compression, modern format)
      await image
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      // Create optimized JPG version
      await image
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);
      
      console.log(`✅ Optimized: ${file}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
}

optimizeImages(); 