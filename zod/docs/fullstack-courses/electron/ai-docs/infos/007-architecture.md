
# architecture Electron industrielle avec mock + tests

  ✅ Objectif
  - ton app Electron simule un périphérique (mock)
  - ton UI Angular communique via WebSocket
  - tu ajoutes des tests d’intégration (par ex. Jest ou Playwright)

  le tout packagé proprement

  1️⃣ Arborescence recommandée
    electron-starter/
      ├── src/
      │   ├── main/                  # process principal
      │   │   ├── main.js
      │   │   ├── server.js          # serveur WebSocket
      │   │   └── mocks/             # mocks hardware
      │   │        └── printer-mock.js
      │   ├── renderer/              # UI Angular build
      │   │   └── (dist Angular)
      │   └── shared/                # interfaces TS partagées
      ├── tests/
      │   └── integration.test.js    # tests d'intégration
      ├── package.json
      └── electron-builder.json      # config build multi-OS