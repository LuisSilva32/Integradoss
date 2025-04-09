import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../db/connection.js'
import authRoutes from '../routes/auth.routes.js'
import informationRoutes from '../routes/information.routes.js'
import researcherRoutes from '../routes/researcher.routes.js'
import configureCloudinary from '../utils/cloudinary.js'

dotenv.config()
const app = express()

// conexion a la base de datos
connectDB()

// configuracion de cloudinary
configureCloudinary()

// midlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// rutas
app.use('/api/information', informationRoutes)
app.use('/api/researchers', researcherRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`El servidor esta en ejecucion en el puerto http://localhost:${PORT}`)
})
