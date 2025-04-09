import {
  createInformationAdapter,
  deleteInformationAdapter,
  fetchInformationAdapter,
  updateInformationAdapter
} from '@/adapters/http/information-adapter'

export const fetchInformationUseCase = async (type, token) => {
  const response = await fetchInformationAdapter(type, token)
  return response.data // Lista de información
}

export const createInformationUseCase = async (data, token) => {
  const response = await createInformationAdapter(data, token)
  return response.data // Elemento creado
}

export const updateInformationUseCase = async (id, data, token) => {
  const response = await updateInformationAdapter(id, data, token)
  return response.data // Elemento actualizado
}

export const deleteInformationUseCase = async (id, token) => {
  await deleteInformationAdapter(id, token)
  return id // ID del elemento eliminado
}

export const filterInformationUseCase = (information, searchTerm) => {
  if (!searchTerm) return information
  return information.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
