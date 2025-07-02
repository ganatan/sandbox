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

