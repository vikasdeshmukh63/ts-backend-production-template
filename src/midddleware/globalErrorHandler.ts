import { NextFunction, Request, Response } from 'express'
import { THttpResponse } from '../types/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: THttpResponse, _: Request, res: Response, __: NextFunction) => {
    res.status(err.statusCode).json(err)
}
