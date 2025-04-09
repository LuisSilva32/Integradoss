import InformationCard from '@/components/cards/InformationCard'
import InformationDetail from '@/components/cards/InformationDetail'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import InformationForm from '@/components/forms/InformationForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { useInformation } from '@/hooks/useInformation'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaMagnifyingGlass, FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function ConvocatoriasAdmin () {
  const navigate = useNavigate()
  const { state: authState } = useContext(AuthContext)
  const { userInfo } = authState
  const {
    information,
    loading,
    error,
    fetchInformation,
    createInformation,
    updateInformation,
    deleteInformation,
    filterInformation
  } = useInformation('convocatoria')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      fetchInformation(userInfo.token)
    }
  }, [userInfo, navigate, fetchInformation])

  useEffect(() => {
  }, [information])

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

  const confirmDeleteInformationHandler = async () => {
    await deleteInformation(selectedItem._id, userInfo.token)
    setConfirmDelete(false)
  }

  const filteredInformation = filterInformation(searchTerm)

  return (
    <>
      <Helmet>
        <title>Administrar - Convocatorias</title>
      </Helmet>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <FaMagnifyingGlass className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Buscar convocatoria...'
              className='pl-10 w-60 shadow-none bg-gray-50'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleCreate} className='bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-none px-6'>
          <FaPlus className='h-4 w-4 md:mr-1' />
          <span className='hidden md:inline-flex'>Agregar nueva convocatoria</span>
        </Button>
      </div>

      {loading
        ? (
          <div className='flex justify-center items-center h-64'>
            <p>Cargando convocatorias...</p>
          </div>
          )
        : error
          ? (
            <div className='text-red-500 text-center'>{error}</div>
            )
          : !Array.isArray(filteredInformation) || filteredInformation.length === 0
              ? (
                <div className='text-center py-10'>
                  <p className='text-gray-500'>No hay convocatorias disponibles</p>
                </div>
                )
              : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                  {filteredInformation.map((item) => (
                    <InformationCard
                      key={item._id}
                      information={item}
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
              {selectedItem ? 'Editar convocatoria' : 'Crear nueva convocatoria'}
            </DialogTitle>
          </DialogHeader>
          <InformationForm
            information={selectedItem}
            type='convocatoria'
            setOpenModal={setOpenCreateModal}
            onSuccess={(id, data, token) => {
              return id ? updateInformation(id, data, token) : createInformation(data, token)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openViewModal} onOpenChange={setOpenViewModal}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Detalles de la convocatoria</DialogTitle>
          </DialogHeader>
          <InformationDetail information={selectedItem} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title='Eliminar convocatoria'
        description='¿Estás seguro de que quieres eliminar esta convocatoria? Esta acción no se puede deshacer.'
        confirmText='Sí, eliminar'
        cancelText='No, cancelar'
        onConfirm={confirmDeleteInformationHandler}
        variant='destructive'
      />
    </>
  )
}
