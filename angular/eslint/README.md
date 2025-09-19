# angular-eslint

  ng add @angular-eslint/schematics

  Répondre oui à la question
  The package @angular-eslint/schematics@20.3.0 will be installed and executed.

# Test du code source
  npm run lint

# Modifier les rules de lint
  dans 

  eslint.config.js

    rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case",
          },
        ],
        "no-console": ["error", { "allow": ["warn", "error"] }]
      },

# Rajouter une erreur

dans app.ts

  export class App {
    protected readonly title = signal('angular-starter');

    constructor() {
      console.log('Error lint');
    }
  }

  npm run lint

    13:5  error  Unexpected console statement. Only these console methods are allowed: warn, error  no-console