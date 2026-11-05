import { NotFoundError } from '../../common/errors/not-found-error.js'
import { validateInput } from '../../common/validation/validate-input.js'
import { DateTimeResolver } from 'graphql-scalars'
import type { SnippetsService } from '../snippets.service.js'
import type { FindSnippetsOptions } from '../contracts/find-snippet.js'
import { createSnippetSchema } from '../schemas/create-snippet.schema.js'
import { updateSnippetSchema } from '../schemas/update-snippet.schema.js'

export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) { }

    private findAll = (_parent: unknown, options: FindSnippetsOptions) => {
        return this.snippetService.findAll(options)
    }

    private findOne = async (_parent: unknown, { id }: { id: string }) => {
        const snippet = await this.snippetService.findById(id)

        if (!snippet) {
            throw new NotFoundError('Snippet', id)
        }

        return snippet
    }

    private create = (_parent: unknown, { input }: { input: unknown }) => {
        return this.snippetService.create(validateInput(createSnippetSchema, input))
    }

    private update = async (_parent: unknown, { id, input }: { id: string; input: unknown }) => {
        const snippet = await this.snippetService.update(id, validateInput(updateSnippetSchema, input))

        if (!snippet) {
            throw new NotFoundError('Snippet', id)
        }

        return snippet
    }

    private delete = async (_parent: unknown, { id }: { id: string }) => {
        const deleted = await this.snippetService.delete(id)

        if (!deleted) {
            throw new NotFoundError('Snippet', id)
        }

        return id
    }

    createResolverMap() {
        return {
            DateTime: DateTimeResolver,
            Query: {
                snippet: this.findOne,
                snippets: this.findAll,
            },
            Mutation: {
                createSnippet: this.create,
                updateSnippet: this.update,
                deleteSnippet: this.delete,
            },
        }
    }
}
