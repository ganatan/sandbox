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
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})


// const { app, BrowserWindow } = require('electron')

// const createWindow = () => {
//   console.log('00000000001:main');
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })
//   console.log('00000000002:main');
//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   console.log('00000000003:main');
//   createWindow()
// })