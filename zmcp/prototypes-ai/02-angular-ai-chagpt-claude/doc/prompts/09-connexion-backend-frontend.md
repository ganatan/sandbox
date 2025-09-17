Je développe une application Angular (version 19) et un backend en Node.js (Express).

Je veux que mon application Angular appelle mon backend via HTTP GET pour récupérer des données dynamiques (ex : biographie d’un réalisateur).

Le backend écoute sur `http://localhost:3000/person/ridley-scott`  
et retourne une biographie texte.

Donne-moi le code minimal Angular à ajouter :
- un service HTTP pour effectuer l’appel
- une méthode dans le composant
- et comment afficher la réponse dans un `textarea`

Je veux que ce soit très simple, sans commentaire, et prêt à copier-coller.

Remarque ce sera Angular  19 minimum donc gestion implicte de standalone
Et je veux generer les fichiers comme les services ou components avec Angular CLI