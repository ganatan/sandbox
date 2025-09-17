const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.get('/', (req, res) => {
  res.send('angular-podcast-video-generator')
})


app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})

