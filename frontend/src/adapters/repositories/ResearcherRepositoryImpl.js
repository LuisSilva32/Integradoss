import { Researcher } from '@/domain/entities/Researcher'
import { ResearcherRepository } from '@/domain/ports/ResearcherRepository'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/researchers'

export class ResearcherRepositoryImpl extends ResearcherRepository {
  async fetchResearchers ({ page, limit, search, token }) {
    const response = await axios.get(API_URL, {
      params: { page, limit, search },
      headers: { Authorization: `Bearer ${token}` }
    })
    return {
      researchers: response.data.researchers.map(
        (item) => new Researcher(item)
      ),
      currentPage: response.data.currentPage || 1,
      totalPages: response.data.pages || 1,
      totalItems: response.data.total || response.data.researchers.length
    }
  }

  async createResearcher ({ data, token }) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return new Researcher(response.data)
  }

  async updateResearcher ({ id, data, token }) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return new Researcher(response.data)
  }

  async deleteResearcher ({ id, token }) {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
