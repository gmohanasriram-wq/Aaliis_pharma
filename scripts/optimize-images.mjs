import fs from "fs";
import path from "path";
import sharp from "sharp";

const PRODUCTS_DIR = path.resolve("public/images/products");
const LOGO_PATH = path.resolve("public/images/aaliis-logo.png");
const DUP_LOGO_PATH = path.resolve("public/images/logo.png");

async function run() {
  console.log("Starting Image Optimization...");

  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".webp"));
  let originalBytes = 0;
  let optimizedBytes = 0;

  for (const file of files) {
    const filePath = path.join(PRODUCTS_DIR, file);
    const originalStat = fs.statSync(filePath);
    originalBytes += originalStat.size;

    // Read to buffer first to prevent file locks on Windows
    const inputBuffer = fs.readFileSync(filePath);
    const originalMeta = await sharp(inputBuffer).metadata();

    // Optimize to genuine WebP, max 1200px boundary
    const optimizedBuffer = await sharp(inputBuffer)
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    optimizedBytes += optimizedBuffer.length;
    fs.writeFileSync(filePath, optimizedBuffer);

    const newMeta = await sharp(optimizedBuffer).metadata();
    console.log(
      `✓ ${file.padEnd(20)} [${originalMeta.format.toUpperCase()} ${originalMeta.width}x${originalMeta.height}] ${(
        originalStat.size / 1024
      ).toFixed(0)} KB -> [WEBP ${newMeta.width}x${newMeta.height}] ${(
        optimizedBuffer.length / 1024
      ).toFixed(0)} KB (-${(
        (1 - optimizedBuffer.length / originalStat.size) *
        100
      ).toFixed(1)}%)`
    );
  }

  console.log("\n--- Product Images Summary ---");
  console.log(`Current pass total: ${(optimizedBytes / 1024 / 1024).toFixed(2)} MB`);

  // Logo optimization
  if (fs.existsSync(LOGO_PATH)) {
    const logoInput = fs.readFileSync(LOGO_PATH);
    const originalLogoStat = fs.statSync(LOGO_PATH);
    const optimizedLogoBuf = await sharp(logoInput)
      .png({ quality: 90, compressionLevel: 9, effort: 10 })
      .toBuffer();
    fs.writeFileSync(LOGO_PATH, optimizedLogoBuf);
    if (fs.existsSync(DUP_LOGO_PATH)) {
      fs.writeFileSync(DUP_LOGO_PATH, optimizedLogoBuf);
    }
    console.log("\n--- Logo Summary ---");
    console.log(
      `Logo: ${(originalLogoStat.size / 1024).toFixed(0)} KB -> ${(
        optimizedLogoBuf.length / 1024
      ).toFixed(0)} KB (-${(
        (1 - optimizedLogoBuf.length / originalLogoStat.size) *
        100
      ).toFixed(1)}%)`
    );
  }

  console.log("\nAll images optimized successfully!");
}

run().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});

