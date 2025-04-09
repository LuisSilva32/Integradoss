import {
  createResearcherAdapter,
  deleteResearcherAdapter,
  fetchResearchersAdapter,
  updateResearcherAdapter
} from '@/adapters/http/researcher-adapter'

export const fetchResearchersUseCase = async (token) => {
  const response = await fetchResearchersAdapter(token)
  return response.data // Lista de investigadores
}

export const createResearcherUseCase = async (data, token) => {
  const response = await createResearcherAdapter(data, token)
  return response.data // Investigador creado
}

export const updateResearcherUseCase = async (id, data, token) => {
  const response = await updateResearcherAdapter(id, data, token)
  return response.data // Investigador actualizado
}

export const deleteResearcherUseCase = async (id, token) => {
  await deleteResearcherAdapter(id, token)
  return id // ID del investigador eliminado
}

export const filterResearchersUseCase = (researchers, searchTerm) => {
  if (!searchTerm) return researchers
  return researchers.filter((researcher) =>
    researcher.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
