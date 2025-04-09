import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token, acceso denegado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado: no eres administrador' })
    }

    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Sesión expirada: Por favor, inicia sesión nuevamente' })
    }
    res.status(401).json({ message: 'Token inválido', error })
  }
}

export default auth
