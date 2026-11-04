# Réseaux de neurones et deep learning

**Toi :** Un réseau de neurones, c'est un cerveau miniature ?

**Moi :** Non. Le vocabulaire s'inspire historiquement du cerveau, mais les réseaux artificiels sont surtout des assemblages de calculs mathématiques.

## Des nombres qui traversent des couches

Un neurone artificiel combine plusieurs valeurs, pondère leur importance puis applique une transformation. Des milliers ou millions de tels calculs forment un réseau.

Imagine analyser une photo. Les premières transformations peuvent détecter des motifs locaux ; d'autres combinent ces indices en représentations plus complexes. Le réseau ne suit pas nécessairement une liste de notions que nous pouvons nommer.

**Toi :** Et « profond », cela signifie intelligent ?

**Moi :** Non. *Deep* signifie que plusieurs niveaux de transformations sont enchaînés. Cela permet d'apprendre des relations difficiles à écrire explicitement.

## Les poids et l'entraînement

Les poids sont les nombres ajustables du réseau. Lors de l'entraînement, il effectue une prédiction, calcule une erreur et utilise la **rétropropagation** pour déterminer comment cette erreur varie avec les poids. Un optimiseur procède alors à de petites mises à jour.

La rétropropagation utilise notamment la règle mathématique de dérivation en chaîne.

## Pourquoi des machines spécialisées ?

**Toi :** Pourquoi parle-t-on toujours de GPU ?

**Moi :** Parce que l'entraînement demande énormément d'opérations numériques répétitives, notamment sur des matrices. Les processeurs graphiques peuvent exécuter beaucoup de ces opérations en parallèle.

## Les limites

Les réseaux profonds ont besoin de ressources, peuvent reproduire des biais et restent difficiles à expliquer précisément. Ils ne sont pas toujours supérieurs aux méthodes statistiques plus simples.

## À retenir

Un réseau de neurones transforme des nombres en plusieurs étapes et ajuste ses poids par optimisation. Le deep learning a transformé le traitement des images, de la parole et du langage, sans supprimer le besoin de vérification.

**Question suivante :** quelles mathématiques faut-il comprendre ?
