import axios from 'axios';

export async function reply(input) {
  try {
    const name = input.name || 'inconnu';
    const rawStyle = input.style || 'neutral';
    const rawLength = input.length || 'short';

    const lengthMap = {
      short: '20 mots maximum',
      medium: '50 mots maximum',
      long: '80 mots maximum',
    };

    const styleMap = {
      neutral: 'neutre',
      casual: 'décontracté',
      technical: 'technique',
      narrative: 'narratif',
      press: 'journalistique',
    };

    const style = styleMap[rawStyle] || 'neutre';
    const length = lengthMap[rawLength] || 'moyenne';

    const prompt = `Écris une biographie de ${name} en style ${style}, de longueur ${length}`;
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.content[0].text;

  } catch (error) {
    console.error('❌ Erreur Claude:', error.response?.data || error.message);
    throw new Error(`Erreur Claude : ${error.response?.data?.error?.message || error.message}`);
  }
}

