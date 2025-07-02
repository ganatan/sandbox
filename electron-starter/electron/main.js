const { app, BrowserWindow } = require('electron')
const { WebSocketServer } = require('ws')

const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 8080 })
  wss.on('connection', (ws) => {
    console.log('connexion websocket')
    ws.on('message', (msg) => {
      console.log(`reçu: ${msg}`)
      ws.send(`echo: ${msg}`)
    })
  })
  console.log('00000000002:startWebSocketServer');
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
  console.log('00000000001:createWindow');
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  startWebSocketServer()
  createWindow()
})



// const { app, BrowserWindow } = require('electron')

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })
//   win.loadFile('index.html')
//   console.log('00000000001')
//   win.webContents.openDevTools()
// }

// app.whenReady().then(() => {
//   createWindow()
// })
