
# Site Web
  https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app

# Installation electron

  mkdir electron
  cd electron
  npm init -y
  npm install electron

# fichier main.js
  const { app, BrowserWindow } = require('electron')

  const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })

    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

# Fichier Index .html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
  </body>
</html>