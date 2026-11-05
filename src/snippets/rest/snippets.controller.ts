import type { Request, Response } from 'express'
import type { SnippetsService } from '../snippets.service.js'
import { NotFoundError } from '../../common/not-found-error.js'
import { validateInput } from '../../common/validate-input.js'
import { createSnippetSchema } from '../schemas/create-snippet.schema.js'
import { updateSnippetSchema } from '../schemas/update-snippet.schema.js'
import { listSnippetsQuerySchema } from '../schemas/list-snippets-query.schema.js'

export class SnippetsController {
    constructor(private readonly snippetService: SnippetsService) {}

    getAll = async (request: Request, response: Response): Promise<void> => {
        const query = validateInput(listSnippetsQuerySchema, request.query)

        const snippets = await this.snippetService.findAll(query)

        response.json(snippets)
    }

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const snippet = await this.snippetService.findById(request.params.id)

        if (!snippet) {
            throw new NotFoundError('Snippet', request.params.id)
        }

        response.json(snippet)
    }

    create = async (request: Request, response: Response): Promise<void> => {
        const input = validateInput(createSnippetSchema, request.body)

        const snippet = await this.snippetService.create(input)

        response.status(201).json(snippet)
    }

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const input = validateInput(updateSnippetSchema, request.body)

        const snippet = await this.snippetService.update(request.params.id, input)

        if (!snippet) {
            throw new NotFoundError('Snippet', request.params.id)
        }

        response.json(snippet)
    }

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const deleted = await this.snippetService.delete(request.params.id)

        if (!deleted) {
            throw new NotFoundError('Snippet', request.params.id)
        }

        response.status(204).send()
    }
}
