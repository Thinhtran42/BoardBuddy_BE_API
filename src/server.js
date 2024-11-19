import express from 'express'
import bodyParser from 'body-parser' // Middleware để parse request body
import { connectDB } from './config/mongodb'
import requestLoggerMiddleware from './middlewares/requestLogger'
import { env } from './config/environment'
import logger from './config/logger'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const app = express()

app.use(requestLoggerMiddleware) // -> Log cac request
app.use(bodyParser.json()) // -> Parse JSON Request body
app.use(bodyParser.urlencoded({ extends: true })) // -> Parse URL Request body

connectDB()

app.use('/api/v1', APIs_V1)

app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, env.APP_HOST, () => {
    logger.info(
        `Server running at http://${env.APP_HOST}:${env.APP_PORT}/ + BUILD_MODE ${env.BUILD_MODE}`
    )
})