import express from 'express'
import * as chatgptMock from '../mock/llm/chatgpt.mock.js'
import * as claudeMock from '../mock/llm/claude.mock.js'

const router = express.Router()

const providers = {
  chatgpt: chatgptMock.reply,
  claude: claudeMock.reply
}

router.get('/biography/:llm', (req, res) => {
  const { llm } = req.params
  const input = req.body
  const handler = providers[llm]

  if (!handler) {
    return res.status(404).json({ error: `Unknown provider: ${llm}` })
  }

  const result = handler(input)
  res.json({ llm, result })
})

export default router
