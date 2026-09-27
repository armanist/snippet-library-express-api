import {Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import type { Language } from './snippet.js'

@Entity('snippets')
export class SnippetEntity {
    @PrimaryColumn('text')
    id!: string

    @Column({ type: 'varchar' })
    title!: string

    @Column({type: 'text'})
    language!: Language

    @Column({ type: 'varchar' })
    code!: string

    @Column('simple-json')
    tags!: string[]

    @CreateDateColumn()
    createdAt!: Date
}