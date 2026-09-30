import { randomUUID } from "crypto";
import type { SnippetEntity } from "./snippet.entity.js";
import type { Repository } from "typeorm";
import type { FindSnippetsResult, SnippetDraft } from "./snippet.js";

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

    create(draft: SnippetDraft): Promise<SnippetEntity> {
        const snippet = this.snippetRepository.create({
            id: randomUUID(),
            ...draft,
        })

        return this.snippetRepository.save(snippet)
    }

    async update(id: string, changes: Partial<SnippetDraft>): Promise<SnippetEntity | null> {
        const snippet = await this.snippetRepository.findOneBy({id});

        if(!snippet) {
            return null
        }

        Object.assign(snippet, changes)

        return this.snippetRepository.save(snippet)
    }
}