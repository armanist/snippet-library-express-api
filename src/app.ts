import express from 'express'
import cors from 'cors'
import { errorHandler } from './common/error-handler.js'
import type { Router } from 'express'

export default function createApp(snippetsRouter: Router, clientOrigin: string) {
    const app = express()

    app.use(cors({origin: clientOrigin }))
    app.use(express.json())
    app.use('/snippets', snippetsRouter)

    app.get('/health', (request, response) => {
        response.json({ status: 'ok' })
    })

    app.use(errorHandler)

    return app
}