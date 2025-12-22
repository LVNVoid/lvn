import axios from 'axios'

export interface ProfileData {
  name: string
  role: string
  bio?: string
  location?: string
  email: string
  avatar: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export const profileService = {
  async update(data: ProfileData) {
    const res = await axios.put('/api/profile', data)
    return res.data
  }
}
