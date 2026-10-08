import { GraphQLError } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import type { SnippetsService } from "../snippets.service.js";
import type { FindSnippetsOptions } from "../contracts/find-snippet.js";
import { createSnippetSchema } from "../schemas/create-snippet.schema.js";
import { updateSnippetSchema } from "../schemas/update-snippet.schema.js";

export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) { }

    private findAll = (_parent: unknown, options: FindSnippetsOptions) => {
        return this.snippetService.findAll(options)
    }

    private findOne = async (_parent: unknown, { id }: { id: string }) => {
        const snippet = await this.snippetService.findById(id)

        if (!snippet) {
            throw new GraphQLError(`Snippet with ID ${id} was not found`, {
                extensions: { code: 'NOT_FOUND' }
            })
        }

        return snippet;
    }

    private create = (_parent: unknown, { input }: { input: unknown }) => {
        const result = createSnippetSchema.safeParse(input)

        if (!result.success) {
            const message = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join('; ')

            throw new GraphQLError(message, {
                extensions: { code: 'BAD_USER_INPUT' }
            })
        }

        return this.snippetService.create(result.data)
    }

    private update = async (_parent: unknown, { id, input }: { id: string, input: unknown }) => {
        const result = updateSnippetSchema.safeParse(input)

        if (!result.success) {
            const message = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join('; ')

            throw new GraphQLError(message, {
                extensions: { code: 'BAD_USER_INPUT' }
            })
        }

        const snippet = await this.snippetService.update(id, result.data)

        if (!snippet) {
            throw new GraphQLError(`Snippet with ID ${id} was not found`, {
                extensions: { code: 'NOT_FOUND' }
            })
        }

        return snippet
    }

    private delete = async (_parent: unknown, { id }: { id: string }) => {
        const deleted = await this.snippetService.delete(id)

        if (!deleted) {
            throw new GraphQLError(`Snippet with ID ${id} was not found`, {
                extensions: { code: 'NOT_FOUND' }
            })
        }

        return id
    }

    createResolverMap() {
        return {
            DateTime: DateTimeResolver,
            Query: {
                snippet: this.findOne,
                snippets: this.findAll
            },
            Mutation: {
                createSnippet: this.create,
                updateSnippet: this.update,
                deleteSnippet: this.delete
            }
        }
    }
}