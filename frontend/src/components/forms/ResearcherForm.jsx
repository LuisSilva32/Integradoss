import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  name: z.string().min(5, { message: 'El nombre es obligatorio, mínimo 3 caracteres' }),
  description: z.string().min(30, { message: 'La descripción es obligatoria, mínimo 30 caracteres' }),
  image: z.any().optional()
})

export default function ResearcherForm ({ researcher, setOpenModal, onSuccess }) {
  const { state: authState } = useContext(AuthContext)
  const { userInfo } = authState
  const [imagePreview, setImagePreview] = useState(researcher?.image || '')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: researcher?.name || '',
      description: researcher?.description || '',
      image: undefined
    }
  })

  useEffect(() => {
    if (researcher) {
      form.reset({
        title: researcher.title,
        description: researcher.description,
        image: undefined
      })
      setImagePreview(researcher.image || '')
    }
  }, [researcher, form])

  const onSubmit = async (data) => {
    try {
      if (!researcher?._id && !data.image) {
        throw new Error('No se proporcionó una imagen para crear')
      }
      const formData = {
        name: data.name,
        description: data.description
      }
      if (data.image && data.image[0]) {
        formData.image = data.image[0]
      }
      await onSuccess(researcher?._id, formData, userInfo.token)
      setOpenModal(false)
    } catch (error) {
      toast.error('Error al guardar el investigador')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del investigador</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del investigador</FormLabel>
              <FormControl>
                <Textarea {...field} className='min-h-[100px] max-h-[300px] rounded-none border-gray-400' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              {imagePreview && (
                <div className='mb-2 d-flex justify-items-center rounded-none border-dashed border-2 border-gray-400'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='max-w-40 max-h-40 object-contain p-4'
                  />
                </div>
              )}
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    handleImageChange(e)
                    onChange(e.target.files)
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                {!researcher?._id && 'La imagen es obligatoria para crear un nuevo investigador.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-2'>
          <Button
            className='rounded-none'
            type='button'
            variant='outline'
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </Button>
          <Button
            className='bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-none px-6'
            type='submit'
          >{researcher ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
