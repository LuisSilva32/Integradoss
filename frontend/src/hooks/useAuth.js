/* eslint-disable no-undef */
import { authService, notificationAdapter } from '@/adapters'
import { AuthContext } from '@/context/AuthContext'
import { useCallback, useContext, useState } from 'react'

export const useAuth = () => {
  const { dispatch } = useContext(AuthContext) // Obtenemos dispatch del contexto
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signIn = useCallback(
    async (credentials) => {
      setLoading(true)
      try {
        const result = await authService.signIn(credentials)
        const userInfo = { username: credentials.username, token: result.token }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        dispatch({ type: 'USER_SIGNIN', payload: userInfo }) // Actualizamos el estado
        notificationAdapter.success('Sesión iniciada', '¡Bienvenido de nuevo!')
        setLoading(false)
        return result
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
        notificationAdapter.error('Error', errorMessage)
        setError(errorMessage)
        setLoading(false)
        throw err
      }
    },
    [dispatch]
  )

  return { loading, error, signIn }
}
