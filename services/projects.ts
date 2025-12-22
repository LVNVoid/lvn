import axios from 'axios'

export interface ProjectData {
  title: string
  description: string
  tech: string[]
  link?: string | null
  github?: string | null
  image?: string | null
}

export const projectsService = {
  async create(data: ProjectData) {
    const res = await axios.post('/api/projects', data)
    return res.data
  },

  async update(id: string, data: ProjectData) {
    const res = await axios.put(`/api/projects/${id}`, data)
    return res.data
  },

  async delete(id: string) {
    const res = await axios.delete(`/api/projects/${id}`)
    return res.data
  }
}
