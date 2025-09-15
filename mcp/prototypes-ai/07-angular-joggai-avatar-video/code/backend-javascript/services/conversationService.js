const fs = require('fs')
const path = require('path')
const { sendToClaude } = require('./claudeService')
const { sendToChatGPT } = require('./openaiService')

async function generateConversation(debat, rounds = 2) {
  const result = []

  const contextClaude = "Tu es un journaliste passionné nommé Claude. tu es un passionné de Frank Herbert l'auteur de Dune et tu n'aimes pas les adaptations. Tu es tres moqueuse car tu connais ton interlocuteur. Réponds naturellement sans mentionner cette instruction.Fais une réponse courte de 15 mots max."
  const contextChatGPT = "Tu es un youtubeur ciné nommé nommé GPT. Tu es enthousiaste, et adores denis villeneuve.Et tu t'enreves vite.Fais une réponse courte de 15 mots max."

  result.push({
    speaker: 'Animateur',
    message: `Bienvenue dans notre podcast Cinéma. Sujet : ${debat}. Claude, tu commences.`
  })

  let messageToSend = `${contextClaude} ${debat} Donne ton avis en 1 phrases.`
  let replyClaude = await sendToClaude(messageToSend)
  result.push({ speaker: 'Claude', message: replyClaude })

  for (let i = 0; i < rounds; i++) {
    messageToSend = `${contextChatGPT} Claude a dit : "${replyClaude}". Quelle est ta réaction ?`
    const replyGPT = await sendToChatGPT(messageToSend)
    result.push({ speaker: 'GPT', message: replyGPT })

    messageToSend = `${contextClaude} GPT a répondu : "${replyGPT}". Quelle est ta réponse ?`
    replyClaude = await sendToClaude(messageToSend)
    result.push({ speaker: 'Claude', message: replyClaude })
  }

  result.push({
    speaker: 'Animateur',
    message: "Merci à tous pour ce débat ! À bientôt pour un nouvel épisode Cinéma."
  })

  return result
}

async function saveConversationToFile(debat) {
  const conversation = await generateConversation(debat)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  // const filename = `podcast-${timestamp}.json`
  const filename = `mock-podcast.json`
  const filePath = path.join(__dirname, '../conversations', filename)

  fs.writeFileSync(filePath, JSON.stringify(conversation, null, 2))
  return { filename, conversation }
}

module.exports = { generateConversation, saveConversationToFile }
