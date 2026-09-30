import { z } from 'zod'
import { LANGUAGES } from '../snippet.js'

export const snippetFields = {
    title: z.string().min(1),
    language: z.enum(LANGUAGES),
    code: z.string().min(1),
    tags: z.array(z.string()),
}