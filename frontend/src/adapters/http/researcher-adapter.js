import axiosInstance from '@/services/axios' // Usa la instancia personalizada

const API_URL = 'http://localhost:5000/api'

// Función para obtener la información de los investigadores
export const fetchResearchersAdapter = async (token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  const response = await axiosInstance.get(`${API_URL}/researchers`, config)
  return { data: Array.isArray(response.data?.researchers) ? response.data.researchers : [] }
}

// Función para obtener la información de un investigador específico
export const createResearcherAdapter = async (data, token) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('description', data.description)
  if (data.image instanceof File) {
    formData.append('image', data.image)
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.post(`${API_URL}/researchers/create`, formData, config)
}

// Función para actualizar un investigador
export const updateResearcherAdapter = async (id, data, token) => {
  if (!id) {
    throw new Error('ID no proporcionado para actualizar el investigador')
  }
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('description', data.description)
  if (data.image instanceof File) {
    formData.append('image', data.image)
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.put(`${API_URL}/researchers/updateResearcher/${id}`, formData, config)
}

// Función para eliminar un investigador
export const deleteResearcherAdapter = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return axiosInstance.delete(`${API_URL}/researchers/${id}`, config)
}
