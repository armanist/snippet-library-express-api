import type { GraphQLFormattedError } from 'graphql'
import { unwrapResolverError } from '@apollo/server/errors'
import { HttpError } from '../errors/http-error.js'
import { toApiError } from '../errors/to-api-error.js'

export function errorFormatter(
    formattedError: GraphQLFormattedError,
    error: unknown,
): GraphQLFormattedError {
    const thrownError = unwrapResolverError(error)
    const isOurs =
        thrownError instanceof HttpError ||
        formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR'

    if (!isOurs) {
        return formattedError
    }

    const { statusCode, code, message } = toApiError(thrownError)

    if (statusCode === 500) {
        console.log('Unhandled exception', thrownError)
    }

    return {
        ...formattedError,
        message,
        extensions: { ...formattedError.extensions, code },
    }
}
