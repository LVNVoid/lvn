import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const deleteFromCloudinary = async (url: string) => {
  if (!url) return;

  // Extract public_id from URL
  // Example: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[public_id].[format]
  // Supports folders, e.g. v1234/folder/image.jpg -> public_id: folder/image
  
  const regex = /\/v\d+\/(.+)\.\w{3,4}$/;
  const match = url.match(regex);
  
  if (match && match[1]) {
    const publicId = match[1];
    await cloudinary.uploader.destroy(publicId);
  }
};

export default cloudinary;
