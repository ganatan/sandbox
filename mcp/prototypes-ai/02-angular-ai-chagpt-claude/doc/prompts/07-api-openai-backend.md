
Je suis développeur web débutant.  
Je veux un exemple très simple et clair, étape par étape.  

Mon projet s'appelle backend-javascript.

Dans mon fichier `app.js` (backend en JavaScript CommonJS avec Express),  
je veux intégrer un appel à l’API OpenAI (ChatGPT).

Je veux comprendre **comment cela fonctionne** de manière simple.  
Je veux un exemple **minimal** qui envoie une question à ChatGPT et récupère la réponse.

Je veux pouvoir copier-coller le code, sans commentaires.  
Je veux aussi savoir ce qu’il faut installer et configurer.  
Pas de blabla inutile, uniquement l’essentiel.

Objectif : que ça marche localement avec ma clé API,  
et que je comprenne la base pour construire la suite.


voila le fichier app.js actuel

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('application backend-javascript')
})

app.get('/person/:name', (req, res) => {
  const name = req.params.name
  const formatted = name.replace('-', ' ')
  res.send('biographie de ' + formatted)
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})

Je veux que tu adaptes ce code avec les ajouts demandés
Je veux tout le code dans app.js sans aucun autre fichier.

Je veux que la clé soit une constante dans le code

En example prends cette clé fictive

1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-1234-123456789-123456789-123456789-123456789-123456789-123



