import { v2 as cloudinary } from 'cloudinary'
import { z } from 'zod'
import Information from '../models/information.model.js'

// Esquema de validación para información
const informationSchema = z.object({
  type: z.enum(['convocatoria', 'proyecto', 'publicacion'], { message: 'Tipo inválido' }),
  title: z.string().min(2, 'El título debe tener al menos 2 caracteres').max(100),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(5000)
}) // Eliminamos .strict()

export const getInformation = async ({ page = 1, limit = 10, type = '' }) => {
  const skip = (page - 1) * limit
  const query = type ? { type } : {}
  const information = await Information.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  const total = await Information.countDocuments(query)
  return {
    information,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  }
}

export const createInformation = async (informationData, file) => {
  try {
    const validatedData = informationSchema.parse(informationData)
    let imageUrl = ''

    if (file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'semillero/information', resource_type: 'image' },
          (error, result) => {
            if (error) reject(new Error('Error al subir la imagen a Cloudinary'))
            resolve(result)
          }
        ).end(file.buffer)
      })
      imageUrl = result.secure_url
    } else if (validatedData.type === 'convocatoria') {
      throw new Error('La imagen es obligatoria para convocatorias')
    }

    const newInformation = new Information({ ...validatedData, image: imageUrl || null })
    return await newInformation.save()
  } catch (error) {
    throw error instanceof z.ZodError ? new Error(error.errors[0].message) : new Error(error.message || 'Error al crear la información')
  }
}

export const updateInformation = async (id, informationData, file) => {
  try {
    const validatedData = informationSchema.partial().parse(informationData)

    const information = await Information.findById(id)
    if (!information) throw new Error('Información no encontrada')

    information.type = validatedData.type || information.type
    information.title = validatedData.title || information.title
    information.description = validatedData.description || information.description

    if (file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'semillero/information', resource_type: 'image' },
          (error, result) => {
            if (error) reject(new Error('Error al subir la imagen a Cloudinary'))
            resolve(result)
          }
        ).end(file.buffer)
      })

      if (information.image) {
        const publicId = information.image.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`semillero/information/${publicId}`)
      }

      information.image = result.secure_url
    } else if ((validatedData.type || information.type) === 'convocatoria' && !information.image && !file) {
      throw new Error('La imagen es obligatoria para convocatorias si no hay una imagen existente')
    }

    return await information.save()
  } catch (error) {
    throw error instanceof z.ZodError ? new Error(error.errors[0].message) : new Error(error.message || 'Error al actualizar la información')
  }
}

export const deleteInformation = async (id) => {
  try {
    const information = await Information.findById(id)
    if (!information) throw new Error('Información no encontrada')

    if (information.image) {
      const publicId = information.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`semillero/information/${publicId}`)
    }

    await information.deleteOne()
    return information
  } catch (error) {
    throw new Error(error.message || 'Error al eliminar la información')
  }
}
