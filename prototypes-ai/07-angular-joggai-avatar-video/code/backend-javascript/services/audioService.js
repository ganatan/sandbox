const fs = require('fs')
const path = require('path')
const axios = require('axios')
const ffmpegPath = require('ffmpeg-static')
const { spawn } = require('child_process')
require('dotenv').config()

const VOICES = {
  Animateur: '101A8UFM73tcrunWGirw',
  Claude: 'MF3mGyEYCl7XYWbV9V6O',
  GPT: 'TTtB1x9U8PF0Vgf20IAP',
}

async function generateSpeech(text, voiceId, outputPath) {
  const response = await axios.post(
    // `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    `https://api.elevenlabs.io/v1/text-to-speech/101A8UFM73tcrunWGirw?output_format=mp3_44100_128`,
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

function concatAudioFiles(folderPath) {
  return new Promise((resolve, reject) => {
    const listFilePath = path.join(folderPath, 'filelist.txt')
    const outputFilePath = path.join(folderPath, 'podcast-final.mp3')
    
    if (!fs.existsSync(listFilePath)) {
      return reject(new Error('Fichier filelist.txt non trouvé'))
    }
    
    console.log(`🔄 Concaténation des fichiers audio...`)
    
    const ffmpeg = spawn(ffmpegPath, [
      '-f', 'concat',     
      '-safe', '0',       
      '-i', 'filelist.txt',
      '-c', 'copy',       
      'podcast-final.mp3' 
    ], { cwd: folderPath })
    
    ffmpeg.stderr.on('data', (data) => {
      console.log(`FFmpeg: ${data}`)
    })
    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Podcast concaténé: ${outputFilePath}`)
        resolve(outputFilePath)
      } else {
        reject(new Error(`FFmpeg a quitté avec le code ${code}`))
      }
    })
  })
}

async function generateAllAudioFromJson(filename) {
  console.log('🔄 Lecture JSON :', filename)

  try {
    const inputPath = path.join(__dirname, '../conversations', filename)
    if (!fs.existsSync(inputPath)) throw new Error('Fichier JSON introuvable : ' + filename)

    const conversation = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))
    const baseName = path.basename(filename, '.json')
    const outputDir = path.join(__dirname, '../audios', baseName)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const result = []
    const listFilePath = path.join(outputDir, 'filelist.txt')
    const listLines = []

    for (let i = 0; i < conversation.length; i++) {
      const { speaker, message } = conversation[i]
      const voiceId = VOICES[speaker] || VOICES.Animateur
      const fileName = `${String(i + 1).padStart(2, '0')}-${speaker.toLowerCase()}.mp3`
      const filePath = path.join(outputDir, fileName)

      try {
        console.log(`🎙️ Génération audio : ${speaker} → ${fileName} → ${voiceId}`)
        await generateSpeech(message, voiceId, filePath)

        result.push({
          speaker,
          message,
          audio: `/audios/${baseName}/${fileName}`
        })

        // Ajoute au fichier de concaténation ffmpeg
        listLines.push(`file '${fileName}'`)
      } catch (innerErr) {
        console.error(`❌ Erreur génération voix ${speaker} (ligne ${i + 1}) :`, innerErr.message)
        result.push({
          speaker,
          message,
          error: innerErr.message
        })
      }
    }

    fs.writeFileSync(listFilePath, listLines.join('\n'))
    console.log(`📄 Liste des fichiers générée : ${listFilePath}`)
    
    try {
      await concatAudioFiles(outputDir)
      console.log(`🎧 Podcast final généré : /audios/${baseName}/podcast-final.mp3`)
      
      return {
        folder: baseName,
        items: result,
        fullAudio: `/audios/${baseName}/podcast-final.mp3`
      }
    } catch (concatErr) {
      console.error(`❌ Erreur concaténation :`, concatErr.message)
      return {
        folder: baseName,
        items: result,
        error: concatErr.message
      }
    }
  } catch (err) {
    console.error('❌ Erreur globale traitement JSON :', err.message)
    throw err
  }
}

module.exports = { generateAllAudioFromJson }
