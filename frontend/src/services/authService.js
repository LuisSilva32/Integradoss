import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

export class AuthService {
  async signIn (credentials) {
    const response = await axios.post(`${API_URL}/signin`, credentials)
    return response.data
  }
}

export const authService = new AuthService()
