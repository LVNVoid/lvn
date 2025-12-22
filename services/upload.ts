import axios from 'axios'

export const uploadService = {
  async uploadFile(file: File, folder: string): Promise<string> {
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('folder', folder)
    
    const res = await axios.post('/api/upload', uploadData)
    return res.data.secure_url
  }
}
