import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <MotionConfig>
        <StrictMode>
          <App />
        </StrictMode>
      </MotionConfig>
    </AuthContextProvider>
  </BrowserRouter>
)
