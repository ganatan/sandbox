import axios from 'axios';

export async function testElevenLabsAPI(voiceId) {
  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
    const response = await axios.post(
      url,
      {
        text: 'Test',
        model_id: 'eleven_multilingual_v2',
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        timeout: 5000,
      },
    );

    if (response.status === 200 && response.data) {
      console.log('✅ ElevenLabs API accessible');

      return true;
    }

    console.log('❌ ElevenLabs API inaccessible');

    return false;

  } catch (err) {
    console.error('❌ Erreur ElevenLabs API:', err.message);

    return false;
  }
}
