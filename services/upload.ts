export const uploadService = {
  async uploadFile(file: File, folder: string): Promise<string> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  },
};
