import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'

const Router = express.Router()

// API v1 status
// /v1/status
Router.get('/status', (req, res) => {
    res
        .status(StatusCodes.OK)
        .json({ message: 'API v1 are ready to use', code: StatusCodes.OK })
})

// boards API
// /v1/boards
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router