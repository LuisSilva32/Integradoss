import {
  createResearcherUseCase,
  deleteResearcherUseCase,
  fetchResearchersUseCase,
  filterResearchersUseCase,
  updateResearcherUseCase
} from '@/domain/use-cases/researcher-use-cases'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useResearcher () {
  const [researchers, setResearchers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchResearchers = useCallback(async (token) => {
    setLoading(true)
    try {
      const data = await fetchResearchersUseCase(token)
      setResearchers(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError('Error al cargar los investigadores')
      toast.error('Error al cargar los investigadores')
      setResearchers([])
    } finally {
      setLoading(false)
    }
  }, [])

  const createResearcher = useCallback(async (data, token) => {
    setLoading(true)
    try {
      const newResearcher = await createResearcherUseCase(data, token)
      setResearchers((prev) => [...prev, newResearcher])
      toast.success('Investigador creado con éxito')
    } catch (err) {
      setError('Error al crear el investigador')
      toast.error('Error al crear el investigador')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateResearcher = useCallback(async (id, data, token) => {
    setLoading(true)
    try {
      const updatedResearcher = await updateResearcherUseCase(id, data, token)
      setResearchers((prev) =>
        prev.map((item) => (item._id === id ? updatedResearcher : item))
      )
      toast.success('Investigador actualizado con éxito')
    } catch (err) {
      setError('Error al actualizar el investigador')
      toast.error('Error al actualizar el investigador')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteResearcher = useCallback(async (id, token) => {
    setLoading(true)
    try {
      await deleteResearcherUseCase(id, token)
      setResearchers((prev) => prev.filter((item) => item._id !== id))
      toast.success('Investigador eliminado con éxito')
    } catch (err) {
      setError('Error al eliminar el investigador')
      toast.error('Error al eliminar el investigador')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const filterResearchers = useCallback(
    (searchTerm) => filterResearchersUseCase(researchers, searchTerm),
    [researchers]
  )

  return {
    researchers,
    loading,
    error,
    fetchResearchers,
    createResearcher,
    updateResearcher,
    deleteResearcher,
    filterResearchers
  }
}
