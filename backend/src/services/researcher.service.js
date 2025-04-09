import { v2 as cloudinary } from 'cloudinary'
import { z } from 'zod'
import Researcher from '../models/researcher.model.js'

// Esquema de validación para investigadores
const researcherSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(500)
}) // Eliminamos .strict()

export const getResearchers = async ({ page = 1, limit = 10, search = '' }) => {
  const skip = (page - 1) * limit
  const query = search ? { name: { $regex: search, $options: 'i' } } : {}
  const researchers = await Researcher.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  const total = await Researcher.countDocuments(query)
  return {
    researchers,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  }
}

export const createResearcher = async (researcherData, file) => {
  try {
    // Validar datos con Zod
    const validatedData = researcherSchema.parse(researcherData)

    let imageUrl = ''
    if (file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'semillero/researchers', resource_type: 'image' },
          (error, result) => {
            if (error) reject(new Error('Error al subir la imagen a Cloudinary'))
            resolve(result)
          }
        ).end(file.buffer)
      })
      imageUrl = result.secure_url
    } else {
      throw new Error('La imagen es obligatoria para crear una investigadora')
    }

    const newResearcher = new Researcher({ ...validatedData, image: imageUrl })
    return await newResearcher.save()
  } catch (error) {
    throw error instanceof z.ZodError ? new Error(error.errors[0].message) : new Error(error.message || 'Error al crear la investigadora')
  }
}

export const updateResearcher = async (id, researcherData, file) => {
  try {
    // Validar datos con Zod (parcial porque no todos los campos son obligatorios en actualización)
    const validatedData = researcherSchema.partial().parse(researcherData)

    const researcher = await Researcher.findById(id)
    if (!researcher) throw new Error('Investigadora no encontrada')

    researcher.name = validatedData.name || researcher.name
    researcher.description = validatedData.description || researcher.description

    if (file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'semillero/researchers', resource_type: 'image' },
          (error, result) => {
            if (error) reject(new Error('Error al subir la imagen a Cloudinary'))
            resolve(result)
          }
        ).end(file.buffer)
      })

      if (researcher.image) {
        const publicId = researcher.image.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`semillero/researchers/${publicId}`)
      }

      researcher.image = result.secure_url
    } else if (!researcher.image) {
      throw new Error('La imagen es obligatoria si no hay una imagen existente')
    }

    return await researcher.save()
  } catch (error) {
    throw error instanceof z.ZodError ? new Error(error.errors[0].message) : new Error(error.message || 'Error al actualizar la investigadora')
  }
}

export const deleteResearcher = async (id) => {
  try {
    const researcher = await Researcher.findById(id)
    if (!researcher) throw new Error('Investigadora no encontrada')

    if (researcher.image) {
      const publicId = researcher.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`semillero/researchers/${publicId}`)
    }

    await researcher.deleteOne()
    return researcher
  } catch (error) {
    throw new Error(error.message || 'Error al eliminar la investigadora')
  }
}
