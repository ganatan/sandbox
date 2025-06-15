import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

import * as chatgptMock from '../mock/llm/chatgpt.mock.js';
import * as claudeMock from '../mock/llm/claude.mock.js';

import * as chatgptReal from '../services/llm/chatgpt.service.js';
import * as claudeReal from '../services/llm/claude.service.js';

import { generateSpeech } from '../services/audio/audio.service.js';
import { testElevenLabsAPI } from '../services/audio/testElevenLabsAPI.js';

dotenv.config();

const router = express.Router();
const useMock = process.env.USE_MOCK === 'true';

const providers = {
  chatgpt: {
    mock: chatgptMock.reply,
    real: chatgptReal.reply,
  },
  claude: {
    mock: claudeMock.reply,
    real: claudeReal.reply,
  },
};

function getProvider(llm) {
  const provider = providers[llm];
  if (!provider) { throw new Error('unknown-provider'); }

  return useMock ? provider.mock : provider.real;
}

function safeFilename(name, llm) {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${llm}`;
}

router.post('/biography/:llm', async (req, res) => {
  const { llm } = req.params;
  const { name } = req.body;

  try {
    const replyFn = getProvider(llm);
    const reply = await replyFn(req.body);

    if (!name || typeof reply !== 'string') {
      return res.json({ success: false, llm: llm, data: 'invalid-input' });
    }

    const fileName = safeFilename(name, llm);
    const jsonPath = path.join(process.cwd(), 'storage', 'data', `${fileName}.json`);
    await fs.mkdir(path.dirname(jsonPath), { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify({ name: name, llm: llm, text: reply }, null, 2));

    return res.json({ success: true, llm: llm, data: reply });

  } catch (err) {
    const msg = err.message.toLowerCase();
    const unauthorized = msg.includes('unauthorized') || msg.includes('401');

    return res.json({ success: false, llm: llm, data: unauthorized ? 'unauthorized API KEY' : msg });
  };
});

router.post('/voice/:llm', async (req, res) => {
  const { llm } = req.params;
  const { name } = req.body;

  try {

    const replyFn = getProvider(llm);
    const reply = await replyFn(req.body);

    if (!name || typeof reply !== 'string') {
      return res.json({ success: false, llm: llm, data: 'invalid-input' });
    }

    const fileName = safeFilename(name, llm);
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'default';
    const audioUrl = await generateSpeech(reply, voiceId, `${fileName}.mp3`);

    return res.json({ success: true, llm: llm, data: reply, audioUrl: audioUrl });

  } catch (err) {
    const msg = err.message.toLowerCase();
    const unauthorized = msg.includes('unauthorized') || msg.includes('401');

    return res.json({ success: false, llm: llm, data: unauthorized ? 'unauthorized API KEY' : msg });
  }
});

router.get('/health/tts', async (req, res) => {
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'default';
  const result = await testElevenLabsAPI(voiceId);
  res.json({ success: result });
});

export default router;
