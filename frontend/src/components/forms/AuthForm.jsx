import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import * as input from '@/components/ui/input'
import { loginSchema } from '@/lib/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa6'

export default function AuthForm ({ onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <div className='relative'>
                  <input.Input
                    icon={FaUser}
                    placeholder='Ingresar usuario'
                    className='pl-10 border-gray-600'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className='relative'>
                  <input.Input
                    icon={FaLock}
                    type='password'
                    placeholder='●●●●●●●●'
                    className='pl-10 border-gray-600'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className='text-right'>
          <a href='/forgot-password' className='text-sm text-gray-700 hover:underline'>
            ¿Olvidaste tu contraseña?
          </a>
        </div> */}
        <Button
          type='submit'
          className='bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-none px-6 w-full'
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}
