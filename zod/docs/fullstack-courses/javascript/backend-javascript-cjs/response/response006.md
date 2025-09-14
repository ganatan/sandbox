# D'abord debuggage

# backend-javascript
solution dans webpack.config.js

externals: {
    'cloudflare:sockets': 'commonjs cloudflare:sockets'
  }


# frontend-angular
    "test:headless": "ng test --watch=false --browsers=ChromeHeadless",


# creer deux yml
dans .github/workflows



backend.yml

name: Backend

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


frontend.yml

name: Frontend

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend-angular
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:headless
      - run: npm run build
