import type { ErrorRequestHandler } from "express";
import { HttpError } from "./http-error.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const isHttpError = error instanceof HttpError
    const statusCode = isHttpError ? error.statusCode : 500

    if (!isHttpError) {
        console.log('Unhandled exception', error)
    }

    res.status(statusCode).json({
        statusCode,
        error: isHttpError ? 'HTTP error' : 'Internal server error',
        message: isHttpError ? error.message : 'Internal server error',
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    })
}