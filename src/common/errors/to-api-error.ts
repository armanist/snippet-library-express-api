import { HttpError } from './http-error.js'

export interface ApiError {
    statusCode: number
    code: string
    message: string
}

const CODES_BY_STATUS: Record<number, string> = {
    400: 'BAD_USER_INPUT',
    404: 'NOT_FOUND',
}

export function toApiError(error: unknown): ApiError {
    if (error instanceof HttpError) {
        return {
            statusCode: error.statusCode,
            code: CODES_BY_STATUS[error.statusCode] ?? 'INTERNAL_SERVER_ERROR',
            message: error.message,
        }
    }

    return {
        statusCode: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
    }
}
