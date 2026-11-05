import { z } from 'zod'
import { LANGUAGES } from '../contracts/snippet-language.js'

export const snippetFields = {
    title: z.string().min(1).max(100),
    language: z.enum(LANGUAGES),
    code: z.string().min(1),
    tags: z.array(z.string()),
}
