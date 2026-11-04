# Données, algorithmes et modèles

**Toi :** Comment une IA utilise-t-elle les données ?

**Moi :** Elle y recherche des régularités qui lui permettent de produire des résultats utiles. Mais il faut séparer trois objets que l'on confond souvent.

## Les trois éléments

Les **données** sont les observations : des textes, des images, des mesures ou des exemples de réponses.

L'**algorithme d'apprentissage** désigne la méthode qui modifie les paramètres.

Le **modèle** est le système ainsi obtenu : il reçoit une entrée et calcule une sortie.

Imagine une estimation immobilière. Les exemples contiennent surface, quartier, état du bien et prix. L'apprentissage cherche des relations statistiques. Le modèle utilise ensuite ces relations pour estimer le prix d'un logement inconnu.

## Apprendre n'est pas mémoriser

**Toi :** Si le modèle a vu des milliers d'exemples, ne se contente-t-il pas de les retenir ?

**Moi :** Il peut parfois mémoriser des éléments, ce qui présente des risques. Mais l'objectif est de **généraliser** : réussir sur de nouveaux cas. Un modèle qui connaît seulement les réponses de son entraînement est peu utile.

On sépare donc idéalement les données d'entraînement, de validation et de test. Le test final doit rester indépendant des ajustements.

## Le problème des mauvaises données

Une collection d'exemples peut être biaisée, trop petite, inexacte ou non représentative. Le modèle risque alors d'apprendre des raccourcis trompeurs.

**Toi :** Une corrélation suffit-elle à expliquer une cause ?

**Moi :** Non. Deux phénomènes peuvent évoluer ensemble sans que l'un provoque l'autre. Un modèle peut prédire correctement tout en donnant une mauvaise explication causale.

## À retenir

Les données fournissent des exemples ; l'algorithme entraîne ; le modèle prédit. La qualité se juge surtout sur les situations nouvelles et non seulement sur les performances pendant l'entraînement.

**Question suivante :** comment les paramètres changent-ils ?
