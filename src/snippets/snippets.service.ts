import type { Repository } from "typeorm";
import { SnippetEntity } from "./snippet.entity.js";
import type { FindSnippetsResult } from "./snippet.js";

export class SnippetsService {
    constructor(private readonly snippetRepository: Repository<SnippetEntity>) {}

    async findAll(): Promise<FindSnippetsResult> {
        const page = 1
        const limit = 20

        const [snippets, total] = await this.snippetRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        })

        return {
            snippets,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async findById(id: string): Promise<SnippetEntity | null> {
        return await this.snippetRepository.findOneBy({id})
    }
}