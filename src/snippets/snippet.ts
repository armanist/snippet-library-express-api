export const LANGUAGES = [
    'php',
    'javascript',
    'typescript',
    'html',
    'css',
] as const

export type Language = (typeof LANGUAGES)[number]

export interface Snippet {
  id: string
  title: string
  language: Language
  code: string
  tags: string[]
  createdAt: Date
}

export type SnippetDraft = Omit<Snippet, 'id' | 'createdAt'>

export interface FindSnippetsOptions {
    search?: string
    page?: number,
    limit?: number
}

export interface PaginationMetadata {
    page: number
    limit: number
    total: number
    totalPages: number
}

export interface FindSnippetsResult {
    snippets: Snippet[]
    pagination: PaginationMetadata
}