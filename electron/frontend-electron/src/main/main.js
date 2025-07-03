const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: false }
  })
  win.loadFile(path.join(__dirname, 'dist/angular-electron/browser/index.html'))
}

app.whenReady().then(() => {
  createWindow()
})
