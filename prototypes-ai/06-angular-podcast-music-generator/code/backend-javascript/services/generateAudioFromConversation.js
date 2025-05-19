// backend-loudly/generate.js
import axios from 'axios'
import fs from 'fs'

const API_URL = 'https://developer.loudly.com/api/v1/generate'
const API_KEY = 'TON_TOKEN_ICI'

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
}

const payload = {
  genre: 'lofi',
  mood: 'chill',
  duration: 30 // en secondes
}

async function generateTrack() {
  const res = await axios.post(API_URL, payload, { headers })
  const downloadUrl = res.data.download_url
  const mp3 = await axios.get(downloadUrl, { responseType: 'stream' })
  mp3.data.pipe(fs.createWriteStream('track.mp3'))
  console.log('✅ Piste générée : track.mp3')
}

generateTrack()
