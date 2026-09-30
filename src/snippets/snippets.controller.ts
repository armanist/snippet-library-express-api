import type { Request, Response } from "express";
import type { SnippetsService } from "./snippets.service.js";
import { HttpError } from "../common/http-error.js";

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
}