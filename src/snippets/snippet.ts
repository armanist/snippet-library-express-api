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