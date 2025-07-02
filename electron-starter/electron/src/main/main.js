const { app, BrowserWindow } = require('electron')
const WebSocket = require('ws')

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 })
  wss.on('connection', (ws) => {
    console.log('connexion websocket')
    ws.on('message', (msg) => {
      console.log(`reçu: ${msg}`)
      ws.send(`echo: ${msg}`)
    })
  })
  console.log('00000000002:startWebSocketServer')
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
  console.log('00000000001:createWindow')
  win.webContents.openDevTools()

  return win
}

if (process.env.NODE_ENV !== 'test') {
  app.whenReady().then(() => {
    startWebSocketServer()
    createWindow()
  })
}

module.exports = { createWindow, startWebSocketServer }

