import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apirouter'
import globalErrorHandler from './midddleware/globalErrorHandler'
import responseMessage from './constants/responseMessage'
import httpError from './util/httpError'
import helmet from 'helmet'
import cors from 'cors'
const app: Application = express()

// middleware
app.use(helmet())
app.use(
    cors({
        methods: [ 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['http://localhost:3000'],
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// routes
app.use('/api/v1', router)

// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// global error handler
app.use(globalErrorHandler)

export default app
