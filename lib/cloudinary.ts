import { v2 as cloudinary } from "cloudinary";

const cloudinaryUrl =
  process.env.CLOUDINARY_URL ||
  "cloudinary://611133344595584:TdrYpS_y0pl9jv5ZXY8EIS81H64@ovwiwt64";

if (cloudinaryUrl) {
  const matches = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (matches) {
    cloudinary.config({
      api_key: matches[1],
      api_secret: matches[2],
      cloud_name: matches[3],
      secure: true,
    });
  } else {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
      secure: true,
    });
  }
}

export default cloudinary;

export async function uploadToCloudinary(
  filePath: string,
  folder: string = "cura/media"
): Promise<{ url: string; public_id: string }> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error(`Error uploading ${filePath} to Cloudinary:`, error);
    throw error;
  }
}
