import * as researcherService from '../services/researcher.service.js'

// Obtener todos los investigadores
export const getResearchers = async (req, res) => {
  try {
    const { page, limit, search } = req.query
    const researchersData = await researcherService.getResearchers({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search: search || ''
    })
    res.status(200).json(researchersData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear nuevo investigador (solo administrador)
export const createResearcher = async (req, res) => {
  try {
    const researcherData = await researcherService.createResearcher(req.body, req.file)
    res.status(201).json(researcherData)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Actualizar investigador existente (solo administrador)
export const updateResearcher = async (req, res) => {
  try {
    const researcherData = await researcherService.updateResearcher(req.params.id, req.body, req.file)
    if (!researcherData) {
      return res.status(404).json({ message: 'Investigadora no encontrada' })
    }
    res.status(200).json(researcherData)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Eliminar investigador existente (solo administrador)
export const deleteResearcher = async (req, res) => {
  try {
    const deletedResearcher = await researcherService.deleteResearcher(req.params.id)
    res.status(200).json({ message: 'Investigador eliminado', researcher: deletedResearcher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
