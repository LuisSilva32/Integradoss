import * as informationService from '../services/information.service.js'

// Obtener toda la información
export const getInformation = async (req, res) => {
  try {
    const { page, limit, type } = req.query
    const informationData = await informationService.getInformation({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      type: type || ''
    })
    res.status(200).json(informationData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear información nueva (solo administrador)
export const createInformation = async (req, res) => {
  try {
    const newInformation = await informationService.createInformation(req.body, req.file)
    res.status(201).json(newInformation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Actualizar información existente (solo administrador)
export const updateInformation = async (req, res) => {
  try {
    const information = await informationService.updateInformation(req.params.id, req.body, req.file)
    if (!information) {
      return res.status(404).json({ message: 'Información no encontrada' })
    }
    res.status(200).json(information) // Cambiado de 201 a 200
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Eliminar información existente (solo administrador)
export const deleteInformation = async (req, res) => {
  try {
    const deletedInformation = await informationService.deleteInformation(req.params.id)
    res.status(200).json({ message: 'Información eliminada exitosamente', information: deletedInformation }) // Cambiado de 201 a 200
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
