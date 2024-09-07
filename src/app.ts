import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apirouter'
import globalErrorHandler from './midddleware/globalErrorHandler'
import responseMessage from './constants/responseMessage'
import httpError from './util/httpError'
const app: Application = express()

// middleware
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
