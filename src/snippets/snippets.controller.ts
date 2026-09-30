import type { Request, Response } from "express";
import type { SnippetsService } from "./snippets.service.js";
import { HttpError } from "../common/http-error.js";
import { createSnippetSchema } from "./schemas/create-snippet.schema.js";
import { updateSnippetSchema } from "./schemas/update-snippet.schema.js";

export class SnippetsController {
    constructor(private readonly snippetService: SnippetsService) {}

    getAll = async (request: Request, response: Response): Promise<void>  => {
        const result = await this.snippetService.findAll()

        response.json(result)
    }

    getOne = async (request: Request<{id: string}>, response: Response): Promise<void> => {
        const snippet = await this.snippetService.findById(request.params.id)

        if(!snippet) {
            throw new HttpError(404, `Snippet with ID ${request.params.id} was not found`)
        }

        response.json(snippet)        
    }

    create = async (request: Request, response: Response): Promise<void> => {
        const result = createSnippetSchema.safeParse(request.body)

        if(!result.success) {
            const message = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join('; ')

            throw new HttpError(400, message)
        }

        const snippet = await this.snippetService.create(result.data)

        response
            .status(201)
            .json(snippet)
    } 

    update = async(request: Request<{id: string}>, response: Response): Promise<void> => {
        const result = updateSnippetSchema.safeParse(request.body)

        if(!result.success) {
            const message = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join('; ')

            throw new HttpError(400, message)
        }

        const snippet = await this.snippetService.update(request.params.id, result.data)

        if(!snippet) {
            throw new HttpError(404, `Snippet with ID ${request.params.id} was not found`)
        }

        response.json(snippet)
    }
}