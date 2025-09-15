const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function generateImageFromPrompt(prompt, filename = 'podcast_dune.png') {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: "dall-e-3", 
        prompt,
        n: 1,
        size: '1024x1024',
        quality: "hd"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    )
    const imageUrl = response.data.data[0].url
    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' })
    const outputDir = path.join(__dirname, '../public/images')
    const imagePath = path.join(outputDir, filename)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    const writer = fs.createWriteStream(imagePath)
    imageResponse.data.pipe(writer)
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve({ url: `/images/${filename}` }))
      writer.on('error', reject)
    })
  } catch (err) {
    console.error('❌ Erreur lors de la génération ou du téléchargement :', err.message)
    throw err
  }
}

module.exports = { generateImageFromPrompt }
