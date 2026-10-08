import type { Language } from "./snippet-language.js"

export interface Snippet {
  id: string
  title: string
  language: Language
  code: string
  tags: string[]
  createdAt: Date
}