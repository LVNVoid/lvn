import axios from 'axios'

export interface CertificateData {
  name: string
  issuer: string
  slug?: string
  date: string
  url?: string
  image?: string
}

export const certificatesService = {
  async create(data: CertificateData) {
    const res = await axios.post('/api/certificates', data)
    return res.data
  },

  async update(slug: string, data: CertificateData) {
    const res = await axios.put(`/api/certificates/${slug}`, data)
    return res.data
  },

  async delete(slug: string) {
    const res = await axios.delete(`/api/certificates/${slug}`)
    return res.data
  }
}
