import type { ErrorRequestHandler } from 'express'
import { toApiError } from '../errors/to-api-error.js'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const { statusCode, code, message } = toApiError(error)

    if (statusCode === 500) {
        console.log('Unhandled exception', error)
    }

    res.status(statusCode).json({
        statusCode,
        error: code,
        message,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
    })
}
