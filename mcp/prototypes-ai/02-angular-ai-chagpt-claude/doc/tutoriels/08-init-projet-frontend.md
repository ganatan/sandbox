## ✅ Angular – Application standard avec interface simple (sans CSS)

| Étape | Action                                                                                          |
|-------|-------------------------------------------------------------------------------------------------|
| 1     | Supprimer Angular CLI : `npm uninstall -g @angular/cli`                                        |
| 2     | Installer Angular CLI : `npm install -g @angular/cli`                                          |
| 3     | Vérifier Angular : `ng version`                                                                |
| 4     | Créer un projet standard : `ng new frontend-angular`                                           |
|       | Choix : HTML / CSS / Tests (répondre par défaut = oui)                                         |
| 5     | Aller dans le projet : `cd frontend-angular`                                                   |
| 6     | Modifier le fichier `src/app/app.component.html` avec ce contenu :                             |

```html
<div align="center">
  <h1>angular-openai-integration</h1>

  <input type="text" value="Ridley Scott" size="80">
  <br><br>

  <textarea rows="10" cols="80">
Ridley Scott, c’est l’obsession du cadre parfait au service de mondes inoubliables.
Réalisateur britannique né en 1937, il s’impose comme un architecte du cinéma,
bâtissant des univers visuels puissants, d’Alien à Blade Runner, de Gladiator à The Martian.
  </textarea>
  <br><br>

  <button>openAI</button>
</div>



Modifier app.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend-angular';
}

