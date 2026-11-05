import { HttpError } from './http-error.js'

export class NotFoundError extends HttpError {
    constructor(resource: string, id: string) {
        super(404, `${resource} with ID ${id} was not found`)
    }
}
