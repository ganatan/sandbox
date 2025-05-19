app.js


const express = require('express')
const axios = require('axios')
const app = express()

const villes = ['Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 'Nantes', 'Bordeaux']
const technos = ['Angular', 'React']

const generateFakeData = () => {
  const result = []
  villes.forEach(ville => {
    technos.forEach(techno => {
      result.push({
        ville,
        techno,
        offres: Math.floor(Math.random() * 200 + 50)
      })
    })
  })
  return result
}

app.get('/api/jobs', async (req, res) => {
  const data = generateFakeData()
  res.json(data)
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})
