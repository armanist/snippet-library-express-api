import 'reflect-metadata'
import 'dotenv/config'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { DataSource } from 'typeorm'
import { SnippetEntity } from '../snippets/snippet.entity.js'

const dataSourceDirectory = dirname(fileURLToPath(import.meta.url))

export default new DataSource({
    type: 'better-sqlite3',
    database: process.env.DATABASE_PATH ?? 'snippets.sqlite',
    entities: [SnippetEntity],
    migrations: [join(dataSourceDirectory, 'migrations', '*{.js,.ts}')],
    synchronize: false,
})