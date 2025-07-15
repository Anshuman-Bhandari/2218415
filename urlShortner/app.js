import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { requestLogger } from '../logging-middleware/logger.middleware.js'
import urlRoutes from './routes/url.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(requestLogger)
app.use('/', urlRoutes)

export default app
