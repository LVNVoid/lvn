import { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { uploadService } from '@/services/upload';

interface UseImageUploadReturn {
  imageFile: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  uploadImage: (folder: string) => Promise<string | null>;
  setPreviewUrl: (url: string | null) => void;
}

export function useImageUpload(initialUrl?: string | null): UseImageUploadReturn {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const uploadImage = async (folder: string): Promise<string | null> => {
    if (!imageFile) return null;

    setIsUploading(true);
    try {
      const secureUrl = await uploadService.uploadFile(imageFile, folder);
      return secureUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    imageFile,
    previewUrl,
    isUploading,
    handleFileChange,
    handleRemoveImage,
    uploadImage,
    setPreviewUrl,
  };
}
