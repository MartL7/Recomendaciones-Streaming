import express, { json } from 'express'
import cors from 'cors'
import { routerContent } from './routes/content.js'

const app = express()

const port = process.env.PORT ?? 3000

app.use(json()) 

app.use(cors({ origin: '*' }))

app.disable('x-powered-by')

app.use('/content', routerContent)

app.listen(port, () => console.log(`Server running on port ${port}`))
