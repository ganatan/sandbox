
# Prompt
  mon main js lance par electron

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
    console.log('00000000001')
    win.webContents.openDevTools()
  }

  app.whenReady().then(() => {
    createWindow()
  })


  est ce que je dois integrer le server websocket dedans pourquoi et comment