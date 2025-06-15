import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function generateSpeech(text, voiceId, fileName) {
  // const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const url = 'https://api.elevenlabs.io/v1/text-to-speech/101A8UFM73tcrunWGirw?output_format=mp3_44100_128';
  const outputDir = path.join(process.cwd(), 'public', 'audios');
  await fs.promises.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, fileName);
  const response = await axios.post(
    url,
    {
      text: text,
      model_id: 'eleven_multilingual_v2',
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
    },
  );
  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(`/audios/${fileName}`));
    writer.on('error', reject);
  });
}
