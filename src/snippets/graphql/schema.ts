export const snippetTypeDefs = `#graphql
    scalar DateTime

    enum SnippetLanguage {
        css
        html
        javascript
        php
        typescript
    }

    type Snippet {
        id: ID!
        title: String!
        language: SnippetLanguage!
        code: String!
        tags: [String!]!
        createdAt: DateTime!
    }

    type PaginationMetadata {
        page: Int!
        limit: Int!
        total: Int!
        totalPages: Int!
    }

    type SnippetPage {
        snippets: [Snippet!]!
        pagination: PaginationMetadata!
    }

    type Query {
        snippet(id: ID!): Snippet!
        snippets(search: String, page: Int, limit: Int): SnippetPage!
    }
`;