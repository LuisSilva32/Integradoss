import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as researcherController from '../controllers/researcher.controller.js'
import auth from '../middleware/auth.middleware.js'
import upload from '../middleware/upload.js'

const researcherRoutes = express.Router()

// rutas publicas
researcherRoutes.get('/', expressAsyncHandler(researcherController.getResearchers))

// rutas privadas
researcherRoutes.post('/create', auth, upload.single('image'), expressAsyncHandler(researcherController.createResearcher))
researcherRoutes.put('/updateResearcher/:id', auth, upload.single('image'), expressAsyncHandler(researcherController.updateResearcher))
researcherRoutes.delete('/:id', auth, expressAsyncHandler(researcherController.deleteResearcher))

export default researcherRoutes
