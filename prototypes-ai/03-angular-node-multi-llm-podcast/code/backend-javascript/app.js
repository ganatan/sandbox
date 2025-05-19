const express = require('express')
const cors = require('cors')
const podcastRoute = require('./routes/podcast')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('angular-node-multi-llm-podcast backend')
})

app.use('/api/podcast', podcastRoute)

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})
