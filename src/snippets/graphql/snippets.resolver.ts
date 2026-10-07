import { GraphQLError } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import type { SnippetsService } from "../snippets.service.js";

type SnippetArgs = {
    id: string
}

export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) { }

    private findOne = async (_parent: unknown, { id }: SnippetArgs) => {
        const snippet = await this.snippetService.findById(id)

        if (!snippet) {
            throw new GraphQLError(`Snippet with ID ${id} was not found`, {
                extensions: { code: 'NOT_FOUND' }
            })
        }

        return snippet;
    }

    readonly resolvers = {
        DateTime: DateTimeResolver,
        Query: {
            snippet: this.findOne
        }
    }
}