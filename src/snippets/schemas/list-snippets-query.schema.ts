import { z } from 'zod'

export const listSnippetsQuerySchema = z.strictObject({
    search: z.string().max(100).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional()
})

export type ListSnippetsQuery = z.infer<typeof listSnippetsQuerySchema>