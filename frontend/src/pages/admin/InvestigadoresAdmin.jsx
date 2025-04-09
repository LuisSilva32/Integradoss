import ResearcherCard from '@/components/cards/ResearcherCard'
import ResearcherDetail from '@/components/cards/ResearcherDetail'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import ResearcherForm from '@/components/forms/ResearcherForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { useResearcher } from '@/hooks/useResearcher'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaMagnifyingGlass, FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function InvestigadoresAdmin () {
  const navigate = useNavigate()
  const { state: authState } = useContext(AuthContext)
  const { userInfo } = authState
  const {
    researchers,
    loading,
    error,
    fetchResearchers,
    createResearcher,
    updateResearcher,
    deleteResearcher,
    filterResearchers
  } = useResearcher()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      fetchResearchers(userInfo.token)
    }
  }, [userInfo, navigate, fetchResearchers])

  useEffect(() => {
  }, [researchers])

  const handleCreate = () => {
    setSelectedItem(null)
    setOpenCreateModal(true)
  }

  const handleView = (item) => {
    setSelectedItem(item)
    setOpenViewModal(true)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setOpenCreateModal(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setConfirmDelete(true)
  }

  const confirmDeleteResearcherHandler = async () => {
    await deleteResearcher(selectedItem._id, userInfo.token)
    setConfirmDelete(false)
  }

  const filteredResearchers = filterResearchers(searchTerm)

  return (
    <>
      <Helmet>
        <title>Administrar - Investigadores</title>
      </Helmet>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <FaMagnifyingGlass className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Buscar investigador...'
              className='pl-10 w-60 bg-white'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleCreate} className='bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-none px-6'>
          <FaPlus className='h-4 w-4 md:mr-2' />
          <span className='hidden md:inline-flex'>Agregar nueva investigad@r</span>
        </Button>
      </div>

      {loading
        ? (
          <div className='flex justify-center items-center h-64'>
            <p>Cargando investigadores...</p>
          </div>
          )
        : error
          ? (
            <div className='text-red-500 text-center'>{error}</div>
            )
          : !Array.isArray(filteredResearchers) || filteredResearchers.length === 0
              ? (
                <div className='text-center py-10'>
                  <p className='text-gray-500'>No hay investigadores disponibles</p>
                </div>
                )
              : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                  {filteredResearchers.map((researcher) => (
                    <ResearcherCard
                      key={researcher._id}
                      researcher={researcher}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
                )}

      <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Editar investigador' : 'Crear nuevo investigador'}
            </DialogTitle>
          </DialogHeader>
          <ResearcherForm
            researcher={selectedItem}
            setOpenModal={setOpenCreateModal}
            onSuccess={(id, data, token) =>
              id ? updateResearcher(id, data, token) : createResearcher(data, token)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openViewModal} onOpenChange={setOpenViewModal}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Detalles del investigador</DialogTitle>
          </DialogHeader>
          <ResearcherDetail researcher={selectedItem} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title='Eliminar investigador'
        description='¿Estás seguro de que quieres eliminar este investigador? Esta acción no se puede deshacer.'
        confirmText='Sí, eliminar'
        cancelText='No, cancelar'
        onConfirm={confirmDeleteResearcherHandler}
        variant='destructive'
      />
    </>
  )
}
