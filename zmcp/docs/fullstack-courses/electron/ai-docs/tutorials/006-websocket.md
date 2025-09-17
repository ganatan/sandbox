# Installation du serveur Websocket

ws-server.js :

import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('nouvelle connexion')
  ws.on('message', (msg) => {
    console.log(`reçu: ${msg}`)
    ws.send(`echo: ${msg}`)
  })
})


# Client WebSocket (dans index.html)

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>WebSocket Electron</title>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self' ws://localhost:8080; script-src 'self' 'unsafe-inline'"
    />
  </head>
  <body>
    <h1>WebSocket Test</h1>
    <button id="connect">Connecter WebSocket</button>
    <script>
      let ws
      document.getElementById('connect').addEventListener('click', () => {
        console.log('clic détecté')
        ws = new WebSocket('ws://localhost:8080')
        ws.onopen = () => {
          console.log('WebSocket ouvert')
          ws.send('hello serveur depuis le clic')
        }
        ws.onmessage = (event) => {
          console.log(`serveur dit: ${event.data}`)
        }
        ws.onerror = (err) => {
          console.error(`erreur: ${err.message}`)
        }
        ws.onclose = () => {
          console.log('WebSocket fermé')
        }
      })
    </script>
  </body>
</html>


# Execution
  lancement du server websocket
  node ws-server.js

  lancement du client websocket
    tu lances ton Electron (ou simplement tu ouvres le index.html dans un navigateur si tu veux tester)

  