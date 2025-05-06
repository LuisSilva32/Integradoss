/* eslint-disable no-undef */
import { notificationAdapter } from '@/adapters'
import axios from 'axios'

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: 'https://api.integradoss.com/api'
})

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Cerrar sesión si recibimos un 401
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        localStorage.removeItem('userInfo')
        notificationAdapter.info('Sesión expirada', 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
        window.location.href = '/iniciar-sesion' // Redirigir al login
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
