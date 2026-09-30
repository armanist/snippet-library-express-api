import 'dotenv/config'
import createApp from "./app.js"
import dataSource from './database/data-source.js'
import { SnippetEntity } from './snippets/snippet.entity.js'
import { SnippetsService } from './snippets/snippets.service.js'
import { SnippetsController } from './snippets/snippets.controller.js'
import { createSnippetsRouter } from './snippets/snippets.router.js'


const port = Number(process.env.PORT ?? 3000)

await dataSource.initialize()

const snippetService = new SnippetsService(dataSource.getRepository(SnippetEntity))

const snippetsController = new SnippetsController(snippetService)

const snippetsRouter = createSnippetsRouter(snippetsController)

const app = createApp(snippetsRouter)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})