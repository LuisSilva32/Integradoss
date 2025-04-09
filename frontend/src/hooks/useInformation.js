import {
  createInformationUseCase,
  deleteInformationUseCase,
  fetchInformationUseCase,
  filterInformationUseCase,
  updateInformationUseCase
} from '@/domain/use-cases/information-use-cases'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useInformation (type) {
  const [information, setInformation] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInformation = useCallback(async (token) => {
    setLoading(true)
    try {
      const data = await fetchInformationUseCase(type, token)
      setInformation(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error(`Error al cargar las ${type}s`)
      setInformation([])
    } finally {
      setLoading(false)
    }
  }, [type])

  const createInformation = useCallback(async (data, token) => {
    setLoading(true)
    try {
      const newItem = await createInformationUseCase(data, token) // Ya incluye type
      setInformation((prev) => [...prev, newItem])
      toast.success(`${type} creado con éxito`)
    } catch (err) {
      toast.error(`Error al crear el ${type}`)
      throw err
    } finally {
      setLoading(false)
    }
  }, [type])

  const updateInformation = useCallback(async (id, data, token) => {
    setLoading(true)
    try {
      const updatedItem = await updateInformationUseCase(id, data, token)
      setInformation((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      )
      toast.success(`${type} actualizado con éxito`)
    } catch (err) {
      toast.error(`Error al actualizar el ${type}`)
      throw err
    } finally {
      setLoading(false)
    }
  }, [type])

  const deleteInformation = useCallback(async (id, token) => {
    setLoading(true)
    try {
      await deleteInformationUseCase(id, token)
      setInformation((prev) => prev.filter((item) => item._id !== id))
      toast.success(`${type} eliminado con éxito`)
    } catch (err) {
      toast.error(`Error al eliminar el ${type}`)
      throw err
    } finally {
      setLoading(false)
    }
  }, [type])

  const filterInformation = useCallback(
    (searchTerm) => filterInformationUseCase(information, searchTerm),
    [information]
  )

  return {
    information,
    loading,
    fetchInformation,
    createInformation,
    updateInformation,
    deleteInformation,
    filterInformation
  }
}
