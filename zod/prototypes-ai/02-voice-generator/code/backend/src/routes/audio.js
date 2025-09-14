import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDirectory = path.resolve(__dirname, '../../public/audios');

router.get('/:llm/:filename', (req, res) => {
  console.log('00000000001');
  const { filename } = req.params;
  const filePath = path.join(audioDirectory, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Audio file not found' });
  }

  res.setHeader('Content-Type', 'audio/mpeg');

  return res.sendFile(filePath);
});

export default router;
