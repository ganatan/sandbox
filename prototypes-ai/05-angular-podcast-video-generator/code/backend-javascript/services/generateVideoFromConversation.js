const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

async function generateVideoFromConversation(jsonFilePath) {
  const baseDir = path.dirname(jsonFilePath)
  const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))

  const videoSegments = []

  // 1. Génère les clips pour chaque entrée
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const image = path.join(baseDir, item.image)
    const audio = path.join(baseDir, item.audio)
    const segment = path.join(baseDir, `segment-${String(i).padStart(2, '0')}.mp4`)

    console.log(`🎞️ Génération : ${segment}`)

    const ffmpegCommand = `ffmpeg -y -loop 1 -i "${image}" -i "${audio}" -c:v libx264 -tune stillimage -pix_fmt yuv420p -shortest "${segment}"`
    execSync(ffmpegCommand, { stdio: 'inherit' })

    videoSegments.push(segment)
  }

  // 2. Crée le fichier list.txt
  const listFile = path.join(baseDir, 'list.txt')
  const listContent = videoSegments.map(p => `file '${p}'`).join('\n')
  fs.writeFileSync(listFile, listContent)

  // 3. Concaténation finale
  const finalOutput = path.join(baseDir, 'final.mp4')
  console.log(`🎬 Fusion des clips dans : ${finalOutput}`)

  const concatCommand = `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${finalOutput}"`
  execSync(concatCommand, { stdio: 'inherit' })

  console.log('✅ Vidéo générée avec succès :', finalOutput)
}

const inputFile = process.argv[2]
if (!inputFile) {
  console.error('❌ Utilisation : node generateVideoFromConversation.js <fichier.json>')
  process.exit(1)
}

generateVideoFromConversation(inputFile)
