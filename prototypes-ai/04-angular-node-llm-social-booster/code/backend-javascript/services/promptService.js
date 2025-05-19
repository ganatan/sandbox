const axios = require('axios')
require('dotenv').config()

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const API_KEY = process.env.ANTHROPIC_API_KEY

async function generateImagePrompt(message, speaker) {
  const system = "Tu es un assistant visuel. Pour chaque message, génère un prompt DALL·E pour illustrer le message sous forme d’image stylisée. Claude = sarcastique, GPT = optimiste, Animateur = neutre. Réponds uniquement par le prompt, sans explication."

  const userPrompt = `Personnage : ${speaker}\nMessage : "${message}"\nQuel prompt DALL·E utiliser ?`

  const url = 'https://api.anthropic.com/v1/messages'

  const headers = {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json'
  }

  const body = {
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1000,
    temperature: 0.7,
    messages: [
      {
        role: 'user',
        content: userPrompt
      }
    ]
  }

  try {
    const response = await axios.post(url, body, { headers })
    console.log('Claude reply OK')
    return response.data.content[0].text
  } catch (err) {
    console.error('Claude API Error:', err.response?.data || err.message)
    throw err
  }


}

module.exports = { generateImagePrompt }
