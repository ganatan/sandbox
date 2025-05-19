const express = require('express')
const cors = require('cors')
const path = require('path')
const { generateImageFromPrompt } = require('./services/imageService')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.get('/', (req, res) => {
  res.send('angular-node-llm-social-booster')
})

app.get('/generate-image', async (req, res) => {
  // const prompt = "A cinematic illustration of a podcast studio with two virtual hosts debating the movie Dune. One host is animated, speaking into a microphone. The background features retro sci-fi movie posters, sand dunes, and glowing lights. The style is warm, atmospheric, with cinematic lighting.";
  // const prompt = "Je veux une image pour illustrer un podcast sur un débat a propos du film dune de villeneuve un passionné de herbert qui n'aime pas face à un youtubeur qui aime";
  // const prompt = "A cinematic illustration of a Epic sci-fi movie poster titled ‘Chrono-Skald’. A futuristic team of explorers in high-tech armor stand on a Nordic fjord cliff. Behind them, a massive Viking longship sails through a time portal glowing with blue energy. One Viking bard (Skald) holds a rune-covered staff, surrounded by ghostly echoes of time. Cinematic lighting, dramatic sky, fusion of ancient Norse and futuristic tech";
  const prompt = "A cinematic illustration of a podcast studio with two virtual hosts debating the movie Dune. One host is animated, speaking into a microphone. The background features retro sci-fi movie posters, sand dunes, and glowing lights. The style is warm, atmospheric, with cinematic lighting.";
  if (!prompt) return res.status(400).json({ error: 'prompt manquant' })

  try {
    const result = await generateImageFromPrompt(prompt, 'generated-image.png')
    res.json({ success: true, ...result })
  } catch (err) {
    console.error('❌ Erreur génération image :', err.message)
    res.status(500).json({ success: false, error: err.message })
  }
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})

