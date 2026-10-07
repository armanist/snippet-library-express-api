import express from 'express'
import cors from 'cors'
import { errorHandler } from './common/error-handler.js'
import type { Router } from 'express'
import type { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'

export default function createApp(
    snippetsRouter: Router, 
    clientOrigin: string,
    apoloServer: ApolloServer
) {
    const app = express()

    app.use(cors({origin: clientOrigin }))
    app.use(express.json())
    app.use('/graphql', expressMiddleware(apoloServer))
    app.use('/snippets', snippetsRouter)

    app.get('/health', (request, response) => {
        response.json({ status: 'ok' })
    })

    app.use(errorHandler)

    return app
}