import OpenAI from 'openai'
import config from '../../config/config.js'

class LLMClient {
  constructor({ provider = 'openai', mock = false } = {}) {
    this.provider = provider
    this.mock = mock

    this.openai = !mock && provider === 'openai'
      ? new OpenAI({ apiKey: config.openaiKey })
      : null
  }

  async generateResponse(prompt) {
    if (this.mock) {
      return {
        response: `Mock response for prompt: ${prompt}`,
        inputTokens: 10,
        outputTokens: 20,
        totalTokens: 30,
        cost: '$0.00035'
      }
    }

    try {
      if (this.provider === 'openai') {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert AI assistant.' },
            { role: 'user', content: prompt }
          ]
        })

        const message = response.choices[0].message.content.trim()
        const usage = response.usage
        const cost = ((usage.prompt_tokens * 0.005 + usage.completion_tokens * 0.015) / 1000).toFixed(6)

        return {
          response: message,
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          cost: `$${cost}`
        }
      }

      throw new Error(`Unsupported provider: ${this.provider}`)

    } catch (error) {
      throw new Error(`LLMClient error: ${error.message}`)
    }
  }
}

export default LLMClient


