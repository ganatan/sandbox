mkdir backend-javascript
cd backend-javascript

npm init -y

npm install express
npm install --save-dev nodemon
npm install cors

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('application backend-javascript')
})

app.get('/person/:name', (req, res) => {
  const name = req.params.name
  const formatted = name.replace('-', ' ')
  res.send('biographie de ' + formatted)
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})


"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}