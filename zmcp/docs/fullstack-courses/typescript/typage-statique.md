# Utilisation Object


```bash

# Création du fichier `app.ts`
```
```typescript
  const director01 = {
    firstName: "Christopher",
    lastName: "Nolan"
  };

  console.log(`Réalisateur: ${director01.firstName} ${director01.lastName}`);


  type Director = {
    firstName: string;
    lastName: string;
  };

  const director02: Director = {
    firstName: "Christopher",
    lastName: "Nolan"
  };

  console.log(`Réalisateur: ${director02.firstName} ${director02.lastName}`);

```

# Avantages de TypeScript

- ✅ **Typage sécurisé** (`string` pour `firstName` et `lastName`)
- ✅ **Meilleure autocomplétion** dans **VS Code**
- ✅ **Détection des erreurs** avant exécution
