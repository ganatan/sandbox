import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.PORT || 3000,
  openaiKey: process.env.OPENAI_API_KEY || '',
  mock: process.env.MOCK === 'true',
  provider: process.env.LLM_PROVIDER || 'openai'
}

export default config
