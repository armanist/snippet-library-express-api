import {z} from 'zod'
import { snippetFields } from './snippet-fields.schema.js'

export const updateSnippetSchema = z.strictObject(snippetFields).partial()
             
export type UpdateSnippetInput = z.infer<typeof updateSnippetSchema>