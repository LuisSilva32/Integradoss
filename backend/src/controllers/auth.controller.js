import { authenticateUser } from '../services/auth.service.js'

export const signin = (req, res) => {
  const { username, password } = req.body
  try {
    const token = authenticateUser(username, password)
    res.json({ token })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}
