/* eslint-disable no-undef */
import { notificationAdapter } from '@/adapters'
import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  useCallback,
  useMemo,
  useReducer
} from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const initialState = {
  userInfo: null // { username, token }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null }
    default:
      return state
  }
}

export function AuthContextProvider ({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const navigate = useNavigate()

  // Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_SIGNOUT' })
    notificationAdapter.info('Sesión expirada', 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
    navigate('/iniciar-sesion') // Redirigir al inicio de sesión
  }, [navigate])

  // Cargar el estado inicial desde localStorage y manejar la expiración del token
  useMemo(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo)
      if (userInfo.token) {
        try {
          const decodedToken = jwtDecode(userInfo.token)
          const currentTime = Date.now() / 1000 // Tiempo actual en segundos

          // Verificar si el token ya expiró
          if (decodedToken.exp < currentTime) {
            logout()
          } else {
            dispatch({ type: 'USER_SIGNIN', payload: userInfo })

            // Calcular el tiempo restante hasta la expiración (en milisegundos)
            const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000
            const timeout = setTimeout(() => {
              logout()
            }, timeUntilExpiration)

            // Limpiar el temporizador al desmontar el componente
            return () => clearTimeout(timeout)
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error)
          logout()
        }
      }
    }
  }, [logout])

  const value = { state, dispatch, logout } // Añadimos logout al contexto

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
