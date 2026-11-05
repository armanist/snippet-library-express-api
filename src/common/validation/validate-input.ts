import type { ZodType } from 'zod'
import { BadRequestError } from '../errors/bad-request-error.js'

export function validateInput<T>(schema: ZodType<T>, data: unknown): T {
    const result = schema.safeParse(data)

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('; ')

        throw new BadRequestError(message)
    }

    return result.data
}
