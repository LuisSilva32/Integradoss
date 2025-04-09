import mongoose from 'mongoose'

// coneccion a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('¡Conexión exitosa con la base de datos!')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDB
