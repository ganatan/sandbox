Je développe une application Angular (version 19) et un backend en Node.js (Express).

Je veux que mon application Angular appelle mon backend via HTTP GET pour récupérer des données dynamiques (ex : biographie d’un réalisateur).

Le backend écoute sur `http://localhost:3000/person/ridley-scott`  
et retourne une biographie texte.

Donne-moi le code minimal Angular à ajouter :
- un service HTTP pour effectuer l’appel
- une méthode dans le composant
- et comment afficher la réponse dans un `textarea`

Je veux que ce soit très simple, sans commentaire, et prêt à copier-coller.
Je ne veux pas de composant tout dans app.component.htl
je veux juste un service
Et je veux generer les fichiers avec Angular CLI

Remarque ce sera Angular  19 minimum donc gestion implicte de standalone


le code HTML

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


je veux que l'appel au backend se fasse sur le click du button
Depuis Angular  19 La gestion de HttpClient se fait dans app.config.ts et non dans app.component.ts