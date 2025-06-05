import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import aiRoutes from './routes/ai.js'
import { aiServices } from './config/ai-services.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/ai', aiRoutes)

app.get('/api/ai/services', (req, res) => {
  res.json({ services: aiServices })
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
