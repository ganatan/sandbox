# Le machine learning : comment une machine apprend

**Toi :** Quand on dit « apprendre », qu'est-ce que cela signifie techniquement ?

**Moi :** Modifier des paramètres à partir d'expériences ou de données de manière à améliorer un objectif mesurable.

## Trois manières d'apprendre

En **supervisé**, on dispose d'exemples avec la bonne réponse : identifier un objet sur une photo, estimer un prix.

En **non supervisé**, on recherche une structure sans réponse fournie pour chaque observation : regrouper des objets similaires ou réduire la dimension des données.

En **renforcement**, un agent agit dans un environnement, reçoit des récompenses et cherche à maximiser un résultat sur une série de décisions.

Il existe aussi l'**autosupervision** : les données servent à construire elles-mêmes le signal d'apprentissage. Prédire un élément manquant dans un texte en est un exemple.

## Corriger la trajectoire

**Toi :** Comment sait-on qu'une prédiction est mauvaise ?

**Moi :** On utilise une **fonction de perte** : une mesure numérique de l'écart avec l'objectif. Un algorithme d'optimisation tente de réduire cette perte, en modifiant progressivement les paramètres.

Imagine un archer qui ajuste son tir selon l'écart à la cible. L'analogie est imparfaite, mais elle aide à comprendre la répétition : prédire, mesurer, corriger.

## Deux pièges opposés

Le **sous-apprentissage** survient quand le modèle n'apprend pas les relations utiles. Le **surapprentissage** apparaît quand il colle trop aux exemples vus et fonctionne moins bien sur de nouveaux cas.

**Toi :** Si la perte descend, tout va bien ?

**Moi :** Pas forcément. Elle peut baisser pendant l'entraînement alors que la performance réelle se dégrade. D'où l'importance des données de validation et d'un test indépendant.

## À retenir

Le machine learning ne consiste pas à accumuler des règles écrites une par une. Il ajuste un modèle grâce à un objectif et des données, puis on mesure sa capacité à généraliser.

**Question suivante :** comment les réseaux de neurones réalisent-ils cela ?
