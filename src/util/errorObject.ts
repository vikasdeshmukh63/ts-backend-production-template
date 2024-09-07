import { Request } from 'express'
import { THttpError } from '../types/types'
import responseMessage from '../constants/responseMessage'
import config from '../config/config'
import { EApplicationEnviornment } from '../constants/application'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, errorStatusCode: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // eslint-disable-next-line no-console
    console.error(`CONTROLLER_ERROR`, {
        meta: errorObj
    })

    if (config.ENV === EApplicationEnviornment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return errorObj
}
