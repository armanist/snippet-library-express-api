import { HttpError } from './http-error.js'

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message)
    }
}
