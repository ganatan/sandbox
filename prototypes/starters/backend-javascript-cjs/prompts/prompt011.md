# prompt
je veux implementer docker


# Prompt
je veux implementer docker dans github actions et un badge


mon backend-javascript.yml



name: backend-javascript

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend-javascript
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run coverage
      - run: npm run build


et mon package.json

    "docker:build": "docker build -t backend-javascript .",
    "docker:run": "docker run -p 3000:3000 backend-javascript"    

on peut faire quelque chose pour avoir un badge docker