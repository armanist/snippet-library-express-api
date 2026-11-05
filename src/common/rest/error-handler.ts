import type { ErrorRequestHandler } from 'express'
import { toApiError } from '../errors/to-api-error.js'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const { statusCode, message } = toApiError(error)

    if (statusCode === 500) {
        console.log('Unhandled exception', error)
    }

    res.status(statusCode).json({
        statusCode,
        error: statusCode === 500 ? 'Internal server error' : 'HTTP error',
        message,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
    })
}
