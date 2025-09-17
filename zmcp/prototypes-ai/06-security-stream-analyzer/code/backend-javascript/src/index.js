import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import streamRoutes from './routes/stream.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/stream', streamRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})
