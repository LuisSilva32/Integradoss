import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as authController from '../controllers/auth.controller.js'

const authRoutes = express.Router()

authRoutes.post('/signin', expressAsyncHandler(authController.signin))

export default authRoutes
