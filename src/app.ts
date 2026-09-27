import express from 'express'

const app = express()

app.use(express.json())

app.get('/health', (request, response) => {
    response.json({status: 'ok'})
})

export default app