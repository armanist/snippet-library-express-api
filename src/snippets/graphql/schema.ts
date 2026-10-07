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

    type Query {
        snippet(id: ID!): Snippet!
    }
`;