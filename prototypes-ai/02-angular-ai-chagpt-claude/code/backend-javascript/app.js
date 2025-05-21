const express = require('express')
const axios = require('axios')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('application backend-javascript')
})

app.get('/openai/person/:name', async (req, res) => {
  const name = req.params.name
  const prompt = 'Donne une biographie courte de ' + name.replace('-', ' ')
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      // model: 'gpt-3.5-turbo',
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

app.get('/claude/person/:name', async (req, res) => {
  const name = req.params.name
  const prompt = 'Donne une biographie courte de ' + name.replace('-', ' ')
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': '1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-1234-123456789-123456789-123456789-123456789-123456789-123',
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    )
    res.send(response.data.content[0].text)
  } catch (error) {
    console.error('Erreur Claude:', error.response?.data || error.message)
    res.status(500).send('Erreur lors de la requête Claude')
  }
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})

