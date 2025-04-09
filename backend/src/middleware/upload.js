import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype) {
      return cb(null, true)
    }
    cb(new Error('Solo se permiten imágenes en formato JPEG o PNG'))
  }
})

export default upload
