import axiosInstance from '@/services/axios' // Usa la instancia personalizada

const API_URL = 'http://localhost:5000/api'

// Función para obtener la información de un tipo específico
export const fetchInformationAdapter = async (type, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  const response = await axiosInstance.get(`${API_URL}/information?type=${type}`, config)
  return { data: Array.isArray(response.data?.information) ? response.data.information : [] }
}

// Función para crear una nueva información
export const createInformationAdapter = async (data, token) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('type', data.type)
  if (data.image instanceof File) {
    formData.append('image', data.image)
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.post(`${API_URL}/information/create`, formData, config)
}

// Función para actualizar una información
export const updateInformationAdapter = async (id, data, token) => {
  if (!id) {
    throw new Error('ID no proporcionado para actualizar la información')
  }
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('type', data.type)
  if (data.image instanceof File) {
    formData.append('image', data.image)
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.put(`${API_URL}/information/updateInformation/${id}`, formData, config)
}

// Función para eliminar una información
export const deleteInformationAdapter = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return axiosInstance.delete(`${API_URL}/information/${id}`, config)
}
