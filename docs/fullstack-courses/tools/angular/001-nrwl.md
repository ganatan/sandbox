
# Création d'une application Angular mono repo
  https://nx.dev/angular-tutorial/1-code-generation
  
  npx create-nx-workspace

  examples-angular
    esbuild
    jest

  projet
    angular-starter    

  - Tester les dependances
    npm list --depth=0

  - Mettre à jour le package.json

      "dependencies": {
        "@angular/common": "20.1.3",
        "@angular/compiler": "20.1.3",
        "@angular/core": "20.1.3",
        "@angular/forms": "20.1.3",
        "@angular/platform-browser": "20.1.3",
        "@angular/platform-browser-dynamic": "20.1.3",
        "@angular/router": "20.1.3",
        "rxjs": "7.8.2",
        "zone.js": "0.15.1"
      },
      "devDependencies": {
        "@angular-devkit/core": "20.1.2",
        "@angular-devkit/schematics": "20.1.2",
        "@angular/build": "20.1.2",
        "@angular/cli": "20.1.2",
        "@angular/compiler-cli": "20.1.3",
        "@angular/language-service": "20.1.3",
        "@eslint/js": "9.31.0",
        "@nx/angular": "21.3.5",
        "@nx/cypress": "21.3.5",
        "@nx/eslint": "21.3.5",
        "@nx/eslint-plugin": "21.3.5",
        "@nx/jest": "21.3.5",
        "@nx/js": "21.3.5",
        "@nx/web": "21.3.5",
        "@nx/workspace": "21.3.5",
        "@schematics/angular": "20.1.2",
        "@swc-node/register": "1.10.10",
        "@swc/core": "1.13.2",
        "@swc/helpers": "0.5.17",
        "@types/jest": "30.0.0",
        "@types/node": "24.1.0",
        "@typescript-eslint/utils": "8.38.0",
        "angular-eslint": "20.1.1",
        "cypress": "14.5.2",
        "eslint": "9.31.0",
        "eslint-config-prettier": "10.1.8",
        "eslint-plugin-cypress": "5.1.0",
        "jest": "30.0.5",
        "jest-environment-jsdom": "30.0.5",
        "jest-preset-angular": "15.0.0",
        "jest-util": "30.0.5",
        "nx": "21.3.5",
        "prettier": "3.6.2",
        "ts-jest": "29.4.0",
        "ts-node": "10.9.2",
        "tslib": "2.8.1",
        "typescript": "5.8.3",
        "typescript-eslint": "8.38.0"
      }


# Execution lint compil

  "scripts": {
    "start-starter": "nx serve angular-starter",
    "lint-starter": "nx lint angular-starter",
    "test-starter": "nx test angular-starter",
    "build-starter": "nx build angular-starter",
    "e2e-starter": "nx e2e angular-starter-e2e"
  },

# Creation d'une appli

  npx nx g @nx/angular:app apps/angular-component

