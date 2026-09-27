import 'dotenv/config'
import app from "./app.js"
import dataSource from './database/data-source.js'

const port = Number(process.env.PORT ?? 3000)

await dataSource.initialize()

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})