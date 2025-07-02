 # Debug d'une application electron
  ouvrir la DevTools Electron (renderer)


  const { app, BrowserWindow } = require('electron')

  const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools() // OUVERTURE AUTOMATIQUE DEVTOOLS
  }

  app.whenReady().then(() => {
    createWindow()
  })

  # Debugage connection websocket

  la Content-Security-Policy (CSP) que tu as mis :
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' ws://localhost:8080" />

  Modifier en dev mais pas en prod    
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' ws://localhost:8080; script-src 'self' 'unsafe-inline'" />


  # Debugage connection websocket solution pour prod

  solution plus propre (recommandée en Electron production)
1️⃣ tu déplaces ton script inline dans un fichier externe, par ex. renderer.js :

js
Copier
Modifier
let ws
document.getElementById('connect').addEventListener('click', () => {
  console.log('00000000001')
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
2️⃣ et tu le références proprement :

html
Copier
Modifier
<meta http-equiv="Content-Security-Policy" content="default-src 'self' ws://localhost:8080; script-src 'self'" />
<script src="renderer.js"></script>
✅ plus propre, plus sûr
✅ plus conforme aux recommandations Electron
✅ plus conforme à la CSP stricte

👉 en dev tu peux garder unsafe-inline,
👉 en prod toujours préférer un fichier externe.

si tu veux je te monte une structure complète Electron avec preload.js et contextIsolation, dis-moi.
