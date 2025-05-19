const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const imageUrl = response.data.data[0].url;
    console.log('Image URL:', imageUrl);

    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
    const imagePath = path.join(__dirname, 'podcast_dune.png');
    const writer = fs.createWriteStream(imagePath);

    imageResponse.data.pipe(writer);

    writer.on('finish', () => {
      console.log('Image téléchargée avec succès:', imagePath);
    });

    writer.on('error', (err) => {
      console.error('Erreur lors du téléchargement de l\'image:', err);
    });

  } catch (error) {
    console.error('Erreur lors de la génération de l\'image:', error.response ? error.response.data : error.message);
  }
}

const prompt = "A cinematic illustration of a podcast studio with two virtual hosts debating the movie Dune. One host is animated, speaking into a microphone. The background features retro sci-fi movie posters, sand dunes, and glowing lights. The style is warm, atmospheric, with cinematic lighting.";

generateImage(prompt);
