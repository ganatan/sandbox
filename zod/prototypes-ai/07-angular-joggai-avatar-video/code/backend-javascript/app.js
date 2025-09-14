const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('angular-joggai-avatar-video')
})

async function generateSpeech(text, voiceId, outputPath) {
  // let url = 'https://api.elevenlabs.io/v1/text-to-speech/101A8UFM73tcrunWGirw?output_format=mp3_44100_128'
  let url = 'https://api.elevenlabs.io/v1/text-to-speech/101A8UFM73tcrunWGirw?output_format=mp3_44100_128'
  // text = "Bienvenue dans notre podcast Cinéma. Sujet : Dune de Denis Villeneuve : chef-d'œuvre de science-fiction ou exercice de style surcoté ?. Claude, tu commences."
  // outputPath = "D:\Chendra\04-tutorials\312-fullstack\03-angular-node-multi-llm-podcast\code\backend-javascript\audios\mock-podcast\01-animateur.mp3";
  const response = await axios.post(
    // `https://api.elevenlabs.io/v1/text-to-speech/101A8UFM73tcrunWGirw?output_format=mp3_44100_128`,
    url,
    {
      text,
      model_id: 'eleven_multilingual_v2'
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      responseType: 'stream'
    }
  )
  const writer = fs.createWriteStream(outputPath)
  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(outputPath))
    writer.on('error', reject)
  })
}

app.get('/generate-text', async (req, res) => {
  try {
    const prompt = 'Donne une biographie courte de Ridley Scott 20 mots maximum'
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const result = response.data.choices[0].message.content
    res.send(result)
  } catch (error) {
    console.error('Erreur lors de l’appel à l’API OpenAI:', error.message)
    res.status(500).send('Erreur interne lors de la génération du texte.')
  }
})

app.get('/generate-audio', async (req, res) => {
  try {
    // const inputPath = path.join(__dirname, '../audios', filename)
    // if (!fs.existsSync(inputPath)) throw new Error('Fichier JSON introuvable : ' + filename)

    // const conversation = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))
    // const baseName = path.basename(filename, '.json')
    // const outputDir = path.join(__dirname, '../audios', baseName)

    // if (!fs.existsSync(outputDir)) {
    //   fs.mkdirSync(outputDir, { recursive: true })
    // }
    const audiosDir = path.join(__dirname, './audios')
    if (!fs.existsSync(audiosDir)) {
      fs.mkdirSync(audiosDir, { recursive: true })
    }
    let message = "Ridley Scott, né le 30 novembre 1937 à South Shields, est un réalisateur britannique célèbre pour Alien, Blade Runner, Gladiator."
    let voiceId = '1111111';
    const fileName = `test001.mp3`
    const filePath = path.join(audiosDir, fileName)
    await generateSpeech(message, voiceId, filePath)

    let result = "generate-audio";
    res.send(result)


  } catch (error) {
    console.error('Erreur lors de l’appel à l’API Eleven Labs:', error.message)
    res.status(500).send("Erreur interne lors de la génération de l'audio.")
  }



  // try {
  //   const prompt = 'Donne une biographie courte de Ridley Scott 20 mots maximum'
  //   const response = await axios.post(
  //     'https://api.openai.com/v1/chat/completions',
  //     {
  //       model: 'gpt-4-turbo',
  //       messages: [{ role: 'user', content: prompt }]
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //   const result = response.data.choices[0].message.content
  //   let result = "generate-audio";
  //   res.send(result)
  // } catch (error) {
  //   console.error('Erreur lors de l’appel à l’API OpenAI:', error.message)
  //   res.status(500).send('Erreur interne lors de la génération du texte.')
  // }
})

app.get('/generate-video', async (req, res) => {
  try {
    let avatarId = 1025;
    console.log('00000000001');
    // const prompt = 'Donne une biographie courte de Ridley Scott 20 mots maximum'
    // const response = await axios.post(
    //   'https://api.openai.com/v1/chat/completions',
    //   {
    //     model: 'gpt-4-turbo',
    //     messages: [{ role: 'user', content: prompt }]
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )
    let result = "video";
    res.send(result)
  } catch (error) {
    console.error('Erreur lors de l’appel à l’API OpenAI:', error.message)
    res.status(500).send('Erreur interne lors de la génération du texte.')
  }
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})



// const express = require('express')
// const cors = require('cors')
// const podcastRoute = require('./routes/podcast')

// const axios = require('axios')

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('angular-joggai-avatar-video')
// })

// // app.use('/ai', podcastRoute)

// app.get('/generate-text', async (req, res) => {
//   // const name = req.params.name
//   const prompt = 'Donne une biographie courte de Ridley Scott';
//   const response = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: 'gpt-4-turbo',
//       messages: [{ role: 'user', content: prompt }]
//     },
//     {
//       headers: {
//         Authorization: 'Bearer 1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-1234-123456789-123456789-123456789-123456789-123456789-123',
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//   let result = response.data.choices[0].message.content;
//   res.send('angular-joggai-avatar-video:' + result);
// })

// app.listen(3000, () => {
//   console.log('Serveur démarré sur http://localhost:3000')
// })
