import { randomUUID } from "crypto";
import type { SnippetEntity } from "./snippet.entity.js";
import type { Repository } from "typeorm";
import type { FindSnippetsResult, SnippetDraft, FindSnippetsOptions } from "./snippet.js";

export class SnippetsService {
    constructor(private readonly snippetRepository: Repository<SnippetEntity>) {}

    async findAll(options: FindSnippetsOptions = {}): Promise<FindSnippetsResult> {
        const page = options.page ?? 1
        const limit = options.limit ?? 20

        const normalizedSearch = options.search?.trim().toLowerCase()
        const query = this.snippetRepository.createQueryBuilder('snippet')

        if(normalizedSearch) {
            query
                .where('LOWER(snippet.title) LIKE :search')
                .orWhere('LOWER(snippet.language) LIKE :search')
                .orWhere('LOWER(snippet.code) LIKE :search')
                .orWhere('LOWER(snippet.tags) LIKE :search')
                .setParameter('search', `%${normalizedSearch}%`);
        }

        query
            .orderBy('snippet.createdAt', 'DESC')
            .addOrderBy('snippet.id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit)

        const [snippets, total] = await query.getManyAndCount()

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

    async delete(id: string): Promise<boolean> {
        const result = await this.snippetRepository.delete(id)

        return result.affected === 1
    } 
}