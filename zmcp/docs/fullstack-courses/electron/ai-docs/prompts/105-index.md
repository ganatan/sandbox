Structure of project root:
|-- assets
  |-- favicon.ico
|-- eslint.config.mjs
|-- index.html
|-- jest.config.js
|-- package-lock.json
|-- package.json
|-- README.md
|-- src
  |-- main
    |-- main.js
    |-- preload.js
  |-- renderer
    |-- renderer.js
  |-- shared
|-- tests
  |-- main.test.js
  |-- renderer.test.js
|-- tools
  |-- scripts
    |-- generate-project-structure.js

le fichier index.html est à la racine



le fichier main.js

'use strict';

const { app, BrowserWindow, ipcMain } = require('electron')
const WebSocket = require('ws')

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 })
  wss.on('connection', (ws) => {
    console.log('connexion websocket')
    ws.on('message', (msg) => {
      console.log(`WebSocketServer: ${msg}`)
      ws.send(`Reponse WebSocketServer: ${msg}`)
    })
  })
  console.log('00000000002:startWebSocketServer')
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })
  win.loadFile('index.html')
  console.log('00000000001:createWindow')
  win.webContents.openDevTools()

  return win
}

ipcMain.handle('ping', () => {
  return 'pong'
})

if (process.env.NODE_ENV !== 'test') {
  app.whenReady().then(() => {
    startWebSocketServer()
    createWindow()
  })
}

module.exports = { createWindow, startWebSocketServer }




je pense que index.html serait mieux ailleurs
les best practices
