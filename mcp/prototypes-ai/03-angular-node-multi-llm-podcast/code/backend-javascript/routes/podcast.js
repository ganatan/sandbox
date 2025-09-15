const express = require('express')
const router = express.Router()
const { saveConversationToFile } = require('../services/conversationService')
const { saveMockConversationToFile } = require('../services/conversationService.mock')

const { generateAllAudioFromJson } = require('../services/audioService')

router.get('/generate', async (req, res) => {
  // const debat = req.query.topic || "Angular ou React : quel framework offre la meilleure architecture pour des applications à grande échelle ?"
  const debat = req.query.topic || "Dune de Denis Villeneuve : chef-d'œuvre de science-fiction ou exercice de style surcoté ?"
  try {
    const { filename, conversation } = await saveConversationToFile(debat)
    res.json({ success: true, file: filename, conversation })
  } catch (e) {
    console.error('Erreur génération podcast:', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

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

