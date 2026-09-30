import { z } from 'zod'
import { snippetFields } from './snippet-fields.schema.js'

export const createSnippetSchema = z.strictObject(snippetFields)

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>