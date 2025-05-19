const express = require('express')
const router = express.Router()
const { saveMockConversationToFile } = require('../services/conversationService.mock')

const { generateAllAudioFromJson } = require('../services/audioService')

router.get('/generate-text', async (req, res) => {
  console.log('00000000001');
  // const name = req.params.name
  const prompt = 'Donne une biographie courte de Ridley Scott';
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        Authorization: 'Bearer 1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-1234-123456789-123456789-123456789-123456789-123456789-123',
        'Content-Type': 'application/json'
      }
    }
  )
  res.send(response.data.choices[0].message.content)
})

// router.get('/generate-text', async (req, res) => {
//   const debat = "Donne moi la biographie de Ridley Scott en 4 lignes"
//   console.log('00000000001');
//   try {
//     const { filename, conversation } = await saveConversationToFile(debat)
//     res.json({ success: true, file: filename, conversation })
//   } catch (e) {
//     console.error('Erreur génération podcast:', e)
//     res.status(500).json({ success: false, error: e.message })
//   }
// })

router.get('/mock', async (req, res) => {
  // const debat = req.query.topic || "Angular ou React : quel framework offre la meilleure architecture pour des applications à grande échelle ?"
  const debat = req.query.topic || "Dune de Denis Villeneuve : chef-d'œuvre de science-fiction ou exercice de style surcoté ?"
  try {
    const { filename, conversation } = await saveMockConversationToFile(debat)
    res.json({ success: true, file: filename, conversation })
  } catch (e) {
    console.error('Erreur mock podcast:', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

router.get('/audio/:filename', async (req, res) => {
  try {
    const result = await generateAllAudioFromJson(req.params.filename)
    res.json({ success: true, ...result })
  } catch (err) {
    console.error('Erreur audio:', err.message)
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router

