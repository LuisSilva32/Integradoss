import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AuthContext } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(5, { message: 'El título es obligatorio, mínimo 5 caracteres' }),
  description: z.string().min(50, { message: 'La descripción es obligatoria, mínimo 50 caracteres' }),
  image: z.any().optional()
})

export default function InformationForm ({ information, type, setOpenModal, onSuccess }) {
  const { state: authState } = useContext(AuthContext)
  const { userInfo } = authState
  const [imagePreview, setImagePreview] = useState(information?.image || '')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: information?.title || '',
      description: information?.description || '',
      image: undefined
    }
  })

  useEffect(() => {
    if (information) {
      form.reset({
        title: information.title,
        description: information.description,
        image: undefined
      })
      setImagePreview(information.image || '')
    }
  }, [information, form])

  const onSubmit = async (data) => {
    try {
      if (!information?._id && !data.image) {
        toast.error('No se proporcionó una imagen para crear')
        return
      }

      const formData = {
        title: data.title,
        description: data.description,
        type
      }

      if (data.image && data.image.length > 0) {
        formData.image = data.image[0]
      }

      await onSuccess(information?._id, formData, userInfo.token)
      setOpenModal(false)
      toast.success(information ? 'Información actualizada' : 'Información creada')
    } catch (error) {
      toast.error('Error al guardar la información')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      form.setValue('image', e.target.files)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
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
              <FormLabel>Descripción</FormLabel>
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
                    src={imagePreview || '/placeholder.svg'}
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
                {!information?._id && 'La imagen es obligatoria para crear un nuevo elemento.'}
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
          >{information ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
