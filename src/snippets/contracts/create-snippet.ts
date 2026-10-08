import type { Snippet } from "./snippet.js"

export type CreateSnippetData = Omit<Snippet, 'id' | 'createdAt'>