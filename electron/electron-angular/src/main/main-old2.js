const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: false }
  })
  win.loadFile(
    path.join(__dirname, '../renderer/dist/angular-starter/browser/index.html')
  )
}

app.whenReady().then(() => {
  createWindow()
})
