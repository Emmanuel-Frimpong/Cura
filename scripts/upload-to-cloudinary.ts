import path from "path";
import fs from "fs";
import { uploadToCloudinary } from "../lib/cloudinary";

/** Uploads local catalog images and writes their resulting URL mapping to disk. */
async function runUpload() {
  console.log("☁️  Starting batch upload of all image assets to Cloudinary...");

  const imagesDir = path.join(process.cwd(), "public", "images");
  const files = fs.readdirSync(imagesDir);

  const urlMapping: Record<string, string> = {};

  for (const file of files) {
    if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")) {
      const fullPath = path.join(imagesDir, file);
      console.log(`Uploading ${file} ...`);
      const res = await uploadToCloudinary(fullPath, "cura/media");
      urlMapping[file] = res.url;
      console.log(`  ✓ ${file} -> ${res.url}`);
    }
  }

  const outputPath = path.join(process.cwd(), "cloudinary-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(urlMapping, null, 2));
  console.log(`\n🎉 All images uploaded successfully! Saved mapping to ${outputPath}`);
}

runUpload().catch((err) => {
  console.error("Upload error:", err);
  process.exit(1);
});
