import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as informationController from '../controllers/information.controller.js'
import auth from '../middleware/auth.middleware.js'
import upload from '../middleware/upload.js'

const informationRoutes = express.Router()

// rutas publicas
informationRoutes.get('/', expressAsyncHandler(informationController.getInformation))

// rutas privadas (administrador)
informationRoutes.post('/create', auth, upload.single('image'), expressAsyncHandler(informationController.createInformation))
informationRoutes.put('/updateInformation/:id', auth, upload.single('image'), expressAsyncHandler(informationController.updateInformation))
informationRoutes.delete('/:id', auth, expressAsyncHandler(informationController.deleteInformation))

export default informationRoutes
