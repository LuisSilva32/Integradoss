import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// credenciales para el inicio de sesion del administrador
const adminUser = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  isAdmin: true
}

// función para validar la información de inicio de sesión
export const authenticateUser = (username, password) => {
  if (username !== adminUser.username || password !== adminUser.password) {
    throw new Error('Credenciales invalidas')
  }

  const token = jwt.sign(
    { username: adminUser.username, isAdmin: adminUser.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  return token
}
