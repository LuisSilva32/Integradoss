// components/auth/Login.jsx
/* eslint-disable no-undef */
import AuthForm from '@/components/forms/AuthForm'
import { AuthContext } from '@/context/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'motion/react'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

export default function SignIn () {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(AuthContext)
  const { userInfo } = state
  const { loading, signIn } = useAuth()

  useEffect(() => {
    if (userInfo) {
      navigate('/admin')
    }
  }, [userInfo, navigate])

  const onSubmit = async (data) => {
    try {
      const { token } = await signIn(data)
      const userInfo = { username: data.username, token }
      dispatch({ type: 'USER_SIGNIN', payload: userInfo })
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      navigate('/admin')
    } catch (error) {
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar sesión - Integradoss UPC</title>
      </Helmet>
      <main className='relative flex items-center justify-center min-h-screen overflow-hidden'>
        {/* Imagen de fondo con desenfoque */}
        <motion.div
          className='absolute inset-0 bg-cover bg-center z-0 blur-xs'
          style={{
            backgroundImage: "url('https://res.cloudinary.com/integradoss/image/upload/v1744656520/hero_ytxkqa.jpg')",
            backgroundPosition: '50% 20%'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Gradiente */}
        <div className='absolute inset-0 z-5 bg-gradient-to-b from-gray-900 to-transparent' />
        {/* Contenedor del formulario */}
        <section className='relative z-10 w-full max-w-md p-8 space-y-8 backdrop-blur-md bg-white/67  shadow-sm '>
          <header className='text-center'>
            <h1 className='text-3xl font-light'>Bienvenido</h1>
            <p className='mt-2 text-gray-700 font-light'>Panel administrativo de Integradoss UPC</p>
          </header>
          <AuthForm onSubmit={onSubmit} loading={loading} />
        </section>
      </main>
    </>
  )
}
