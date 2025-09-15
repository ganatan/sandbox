const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const villes = ['Paris', 'Lyon', 'Marseille']
const technos = ['Angular', 'React']

const getJobCount = async (ville, techno) => {
  const query = `${techno} développeur`
  const url = `https://fr.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(ville)}`
  console.log('00000000001:'+ url)
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })
    const $ = cheerio.load(data)
    const countText = $('#searchCountPages').text()
    const match = countText.match(/sur\s+([\d\s]+)/i)
    return match ? parseInt(match[1].replace(/\s/g, '')) : 0
  } catch (e) {
    return 0
  }
}

app.get('/api/jobs', async (req, res) => {
  const result = []
  for (const ville of villes) {
    for (const techno of technos) {
      const offres = await getJobCount(ville, techno)
      result.push({ ville, techno, offres })
    }
  }
  res.json(result)
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})


// const express = require('express')
// const axios = require('axios')
// const app = express()

// const villes = ['Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 'Nantes', 'Bordeaux']
// const technos = ['Angular', 'React']

// const generateFakeData = () => {
//   const result = []
//   villes.forEach(ville => {
//     technos.forEach(techno => {
//       result.push({
//         ville,
//         techno,
//         offres: Math.floor(Math.random() * 200 + 50)
//       })
//     })
//   })
//   return result
// }

// app.get('/api/jobs', async (req, res) => {
//   const data = generateFakeData()
//   res.json(data)
// })

// app.listen(3000, () => {
//   console.log('Serveur démarré sur http://localhost:3000')
// })
