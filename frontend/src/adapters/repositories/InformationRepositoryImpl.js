import { Information } from '@/domain/entities/Information'
import { InformationRepository } from '@/domain/ports/InformationRepository'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/information'

export class InformationRepositoryImpl extends InformationRepository {
  async fetchInformation ({ page, limit, type, token }) {
    const response = await axios.get(API_URL, {
      params: { page, limit, type },
      headers: { Authorization: `Bearer ${token}` }
    })
    return {
      information: response.data.information.map(
        (item) => new Information(item)
      ),
      currentPage: response.data.currentPage,
      totalPages: response.data.pages,
      totalItems: response.data.total
    }
  }

  async createInformation ({ data, token }) {
    const formData = new FormData()
    formData.append('type', data.type)
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)

    const response = await axios.post(API_URL + '/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return new Information(response.data)
  }

  async updateInformation ({ id, data, token }) {
    const formData = new FormData()
    formData.append('type', data.type)
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)

    const response = await axios.put(`${API_URL}/updateInformation/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return new Information(response.data)
  }

  async deleteInformation ({ id, token }) {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
