
# renderer.js
const socket = new WebSocket('ws://localhost:8080')

const input = document.getElementById('messageInput')
const button = document.getElementById('sendButton')
const messages = document.getElementById('messages')

socket.addEventListener('open', () => {
  console.log('WebSocket connecté')
})

socket.addEventListener('message', (event) => {
  const div = document.createElement('div')
  div.textContent = `Serveur : ${event.data}`
  messages.appendChild(div)
})

button.addEventListener('click', () => {
  const text = input.value
  socket.send(text)
  const div = document.createElement('div')
  div.textContent = `Vous : ${text}`
  messages.appendChild(div)
  input.value = ''
})


# index.html

const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
})
win.loadFile('index.html')


# Index.html

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <title>Electron WebSocket</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 2rem;
    }

    input {
      margin: 0.5rem;
    }

    #messages {
      margin-top: 1rem;
      border: 1px solid #ccc;
      padding: 1rem;
    }
  </style>
</head>

<body>
  <h1>WebSocket Electron</h1>
  <input id="messageInput" type="text" placeholder="Tapez un message" />
  <button id="sendButton">Envoyer</button>
  <div id="messages"></div>
  <script src="./src/renderer/renderer.js"></script>
</body>

</html>

rajout de 

  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self' ws://localhost:8080; script-src 'self' 'unsafe-inline'" />

Mais Erreur


Refused to apply inline style because it violates the following Content Security Policy directive: "default-src 'self' ws://localhost:8080". Either the 'unsafe-inline' keyword, a hash ('sha256-AvQmuWWuK3fntT88Mn7z/udiFpCre+brv2TEFeGBRnI='), or a nonce ('nonce-...') is required to enable inline execution. Note also that 'style-src' was not explicitly set, so 'default-src' is used as a fallback.


# Modifier index.html

  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src ws://localhost:8080" />
