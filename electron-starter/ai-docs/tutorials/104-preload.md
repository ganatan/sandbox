

# Creer le fichier
  1️⃣ preload.js

  const { contextBridge, ipcRenderer } = require('electron')

  contextBridge.exposeInMainWorld('api', {
    ping: () => ipcRenderer.invoke('ping')
  })

# Modifier main.js
  const { app, BrowserWindow, ipcMain } = require('electron')


  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })


  ipcMain.handle('ping', () => {
  return 'pong'
})


# Modifier renderer.js
  remplace l’appel direct WebSocket si tu veux tester le bridge, par exemple :

  window.api.ping().then(console.log)


 le renderer ne peut plus appeler directement new WebSocket(...) car il n’a plus accès à l’API Node.js directement.

Comment le faire proprement ?
✅ tu dois passer par le preload.js pour exposer le WebSocket au renderer.