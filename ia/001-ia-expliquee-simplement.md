# L'intelligence artificielle expliquée simplement

**Niveau : débutant — aucune connaissance en IA nécessaire.**

Ce document explique les mêmes idées que le [guide détaillé](README.md), mais avec des mots simples et des exemples de cinéma.

## 1. L'intelligence artificielle, c'est quoi ?

Imagine que tu travailles dans un vidéoclub.

Un client entre et te demande : « J'ai adoré Alien. Quel film me conseilles-tu ? »

Tu peux regarder les films, comparer leurs genres et proposer *The Thing*.

Une intelligence artificielle essaie d'aider un ordinateur à réaliser ce genre de tâche : **observer des informations, les comparer, puis produire une réponse**.

Une IA n'est pas forcément un robot qui parle. Un programme qui classe des films ou cherche des ressemblances peut aussi utiliser des techniques d'IA.

Et une IA peut se tromper : elle ne comprend pas forcément les films comme un humain.

## 2. Pourquoi les humains ont-ils inventé l'IA ?

Les humains ont toujours voulu construire des machines capables de les aider à calculer et à résoudre des problèmes.

Voici l'histoire, racontée simplement :

| Époque | Ce qui se passe | Image à retenir |
|---|---|---|
| 1943 | Des chercheurs imaginent un neurone artificiel très simplifié | Un interrupteur qui combine plusieurs informations |
| 1950 | Alan Turing réfléchit à l'idée d'une machine qui semble intelligente | Peut-on distinguer une réponse humaine d'une réponse de machine ? |
| 1956 | Des chercheurs donnent un nom à leur domaine : intelligence artificielle | Le début officiel d'une nouvelle matière |
| Années 1960 | Des programmes apprennent de premières décisions simples | Une machine qui s'entraîne |
| Années 1970–1980 | On développe des systèmes utilisant des règles | Un grand livre de recettes « si… alors… » |
| Années 1990–2000 | Les ordinateurs apprennent davantage grâce aux données | Apprendre avec beaucoup d'exemples |
| Années 2010 | Les réseaux de neurones profonds progressent | Plusieurs étages de petits calculs |
| Depuis 2017 | Les Transformers font progresser les modèles de langage | Relier les mots d'une phrase |
| Années 2020 | Des IA produisent textes, images et code | Les IA génératives |

**À retenir :** l'IA n'est pas née avec ChatGPT. C'est une longue histoire d'idées, d'essais, d'erreurs et de progrès.

## 3. C'est quoi un algorithme ?

Un algorithme, c'est **une recette**.

Pour cuisiner des pâtes :

1. Faire bouillir de l'eau.
2. Ajouter les pâtes.
3. Attendre.
4. Égoutter.

Un programme informatique suit lui aussi des étapes.

Pour recommander un film :

1. Regarder le genre demandé.
2. Chercher les films du même genre.
3. Éliminer les films déjà vus.
4. Classer les autres.
5. Afficher les meilleurs candidats.

Ce n'est pas automatiquement du machine learning. C'est d'abord un algorithme.

## 4. C'est quoi une règle ?

Imagine une règle très simple :

**SI la note d'un film est au moins 7, ALORS je le recommande.**

En Java :

```java
double note = 8.5;

if (note >= 7.0) {
    System.out.println("Film recommande");
}
```

C'est toi qui as inventé la règle. L'ordinateur ne l'a pas apprise.

Quand un logiciel réunit beaucoup de connaissances et de règles de ce genre pour prendre des décisions, on peut construire un **système expert**.

## 5. C'est quoi « apprendre » pour une machine ?

Imagine que tu montres six fiches de films à l'ordinateur :

| Note | Le spectateur a aimé ? |
|---|---|
| 2 | Non |
| 4 | Non |
| 5 | Non |
| 7 | Oui |
| 8 | Oui |
| 9 | Oui |

Tu ne lui dis pas directement « recommande à partir de 7 ».

Tu lui demandes de **chercher une règle qui correspond aux exemples**.

Il pourrait trouver un seuil situé entre 5 et 7.

C'est une forme très simple d'**apprentissage automatique**, appelé *machine learning*.

Attention : six exemples ne suffisent pas pour prédire les goûts de tous les spectateurs. C'est seulement une expérience pédagogique.

## 6. Données, dataset, feature : ces mots mystérieux

Imagine une grande boîte remplie de fiches de films.

Chaque fiche donne des informations :

- Titre : Alien.
- Année : 1979.
- Durée : 117 minutes.
- Genre : science-fiction, horreur.
- Note : une valeur choisie pour notre expérience.

**Une donnée :** une information, par exemple « 1979 ».

**Un dataset :** toute la boîte de fiches.

**Une feature :** une information qu'on choisit pour aider l'algorithme, par exemple la durée.

**Un label :** la réponse qu'on connaît déjà et qu'on veut apprendre à prédire, par exemple « aimé : oui ».

**Un modèle :** le mécanisme qui utilise ce qu'il a appris pour faire une nouvelle prédiction.

## 7. Classification ou régression ?

Imagine deux questions.

**Question A :** « Ce film sera-t-il classé succès ou échec ? »

La réponse est une **catégorie** : c'est de la *classification*.

**Question B :** « Combien de millions d'euros ce film rapportera-t-il ? »

La réponse est un **nombre** : c'est de la *régression*.

La catégorie « succès » doit être définie précisément avant de programmer : succès par rapport à quel budget, quel marché, quelle période ?

## 8. L'apprentissage supervisé

Imagine un professeur avec un cahier de réponses.

Il montre à un élève des exercices avec les bonnes réponses. L'élève essaie de comprendre comment répondre à un nouvel exercice.

C'est l'idée de l'**apprentissage supervisé** : les données d'entraînement contiennent des exemples **et** leurs réponses attendues.

Exemple : notes et avis de spectateurs.

Le but n'est pas de réciter les anciens exemples : c'est de faire de bonnes prédictions sur de **nouveaux** exemples.

## 9. L'apprentissage non supervisé

Cette fois, le professeur pose des fiches de films sur la table sans donner de réponses.

Il demande : « Fais des groupes de films qui se ressemblent. »

La machine peut regrouper les films selon leur durée, leur époque et leurs genres.

C'est l'idée de l'**apprentissage non supervisé**.

Le programme trouve des groupes, mais il ne sait pas automatiquement quel nom humain donner à chaque groupe.

## 10. L'apprentissage par renforcement

Imagine un jeu.

Un joueur choisit un film à proposer :

- Si le spectateur fictif aime la recommandation : +1 point.
- S'il ne l'aime pas : 0 point.

En répétant le jeu, le programme essaie de choisir des actions qui lui rapportent plus de points.

C'est l'idée de l'**apprentissage par renforcement** : apprendre à agir à partir de récompenses.

Le choix des récompenses est essentiel. Une mauvaise règle de récompense peut conduire à des comportements indésirables.

## 11. KNN : chercher ses voisins

Imagine que tous les films sont des maisons sur une carte.

Les films très semblables habitent près les uns des autres.

Pour trouver des films proches d'Alien, on cherche ses **voisins** selon des caractéristiques choisies.

KNN signifie *k-nearest neighbors* : les **k plus proches voisins**.

Si k = 3, on regarde trois voisins. Pour classifier, on peut utiliser un vote entre leurs catégories.

Le plus difficile n'est pas seulement de calculer les distances : c'est de décider ce que « proche » signifie pour un film.

## 12. K-means : fabriquer des groupes

Imagine 30 billes de plusieurs couleurs posées sur une table.

Tu veux former trois groupes de billes proches.

L'algorithme K-means procède grossièrement comme ceci :

1. Choisir trois centres de groupes.
2. Placer chaque bille dans le groupe dont le centre est le plus proche.
3. Déplacer chaque centre au milieu des billes du groupe.
4. Recommencer jusqu'à stabilisation.

Avec les films, les « billes » seront des fiches transformées en nombres.

K-means ne découvre pas forcément les vrais genres des films. Il découvre des groupes correspondant aux caractéristiques choisies.

## 13. Une régression, c'est quoi ?

Imagine un nuage de points sur une feuille.

Chaque point représente un film : à gauche, son budget ; en haut, ses recettes.

Une **régression linéaire** essaie de tracer une droite qui résume la relation entre ces deux nombres.

La droite aide ensuite à produire une estimation.

Attention : le budget ne suffit pas à prédire les recettes. Une estimation peut être très mauvaise et ne prouve pas qu'un budget provoque directement un succès.

## 14. C'est quoi un neurone artificiel ?

Imagine trois amis qui donnent chacun leur avis sur un film.

Le premier dit « oui », le deuxième « non », le troisième « oui ».

Tu fais plus confiance au premier qu'aux autres.

Un neurone artificiel fonctionne un peu comme un petit calculateur qui :

1. Reçoit plusieurs nombres.
2. Donne un **poids** à chaque nombre.
3. Additionne les résultats.
4. Ajoute un **biais**, une valeur d'ajustement.
5. Transforme le résultat avec une règle appelée **fonction d'activation**.

Un neurone artificiel n'est pas un véritable neurone biologique : c'est un modèle mathématique très simplifié.

## 15. C'est quoi un réseau de neurones ?

Imagine une équipe de petits calculateurs disposés en étages.

Chaque étage reçoit des nombres, les transforme et transmet ses résultats au suivant.

C'est un **réseau de neurones**.

Quand un réseau comporte plusieurs couches de traitement, on entre dans le domaine du **deep learning**.

Pendant l'apprentissage, le programme modifie les poids pour diminuer ses erreurs.

La **descente de gradient** indique comment ajuster les poids. La **rétropropagation** permet de calculer les corrections nécessaires dans les différentes couches.

## 16. C'est quoi un LLM, comme ceux qui servent à créer des assistants ?

LLM veut dire *Large Language Model*, c'est-à-dire **grand modèle de langage**.

Imagine un élève qui a étudié énormément de textes et s'est entraîné à prévoir quels morceaux de texte pouvaient suivre les précédents.

Il découvre ainsi de nombreuses régularités du langage.

Quelques mots importants :

- **Token :** morceau de texte utilisé par le modèle.
- **Embedding :** représentation numérique d'un élément.
- **Attention :** mécanisme aidant le modèle à relier des éléments d'une séquence.
- **Transformer :** architecture de réseau de neurones utilisant notamment l'attention.
- **Inférence :** moment où le modèle utilise ce qu'il a appris pour produire une réponse.
- **Hallucination :** réponse vraisemblable mais fausse ou inventée.

Un LLM peut être très impressionnant, mais ce n'est pas un dictionnaire infaillible.

## 17. Comment savoir si l'IA fonctionne bien ?

Imagine que ton programme réussisse tous les exercices qu'il a déjà vus, mais se trompe sur de nouveaux exercices.

Il a peut-être trop mémorisé ses exemples : c'est le **surapprentissage**.

Pour le vérifier, on sépare les données :

- **Entraînement :** les exercices utilisés pour apprendre.
- **Validation :** les exercices utilisés pour choisir les réglages.
- **Test :** les exercices gardés pour mesurer le résultat final.

On mesure ensuite les erreurs plutôt que de simplement dire « ça marche ».

## 18. Pourquoi les mathématiques sont importantes ?

Tu n'as pas besoin de commencer avec des formules compliquées.

Nous apprendrons dans cet ordre :

| Notion | Explication très simple |
|---|---|
| Moyenne | La valeur moyenne d'un groupe |
| Écart-type | À quel point les nombres sont dispersés |
| Vecteur | Une liste de nombres décrivant quelque chose |
| Distance | À quel point deux éléments sont proches |
| Probabilité | Une façon de mesurer l'incertitude |
| Matrice | Un tableau de nombres |
| Dérivée | Comment un résultat change quand on modifie une valeur |
| Gradient | Comment faire évoluer plusieurs paramètres pour diminuer une erreur |

Nous reprendrons chaque formule avec des exemples chiffrés avant de la programmer.

## 19. Ce que nous ferons avec Java 8

Dans ton environnement sans Internet et sans téléchargement, nous pouvons créer de petits programmes autonomes.

L'ordre proposé :

1. Un programme qui recommande selon une règle simple.
2. Un programme qui calcule des moyennes et des distances.
3. Un programme KNN qui recherche des films proches.
4. Un programme K-means qui regroupe des films fictifs.
5. Une régression qui estime un nombre.
6. Un programme qui apprend les poids d'un perceptron.
7. Un petit réseau de neurones.
8. Un générateur de texte très simple pour comprendre certains concepts des modèles de langage.

Ces expériences utilisent uniquement Java 8 et des données inventées.

Chez toi, nous pourrons ensuite réimplémenter les fonctionnalités pertinentes en Node.js pour BoxyMovies.

**Important :** l'objectif au travail est d'apprendre avec des exemples fictifs dans le cadre des règles de ta mission, sans transférer de code ou de données professionnels.

## 20. Ce qu'il faut absolument retenir

L'IA est une grande famille de méthodes.

Un **algorithme** est une recette.

Un **système expert** applique des règles écrites.

Le **machine learning** ajuste un modèle à partir d'exemples.

L'**apprentissage supervisé** utilise des réponses connues.

L'**apprentissage non supervisé** cherche des structures sans réponses fournies.

L'**apprentissage par renforcement** utilise des récompenses.

Le **deep learning** emploie des réseaux de neurones à plusieurs couches.

Un **LLM** est un grand modèle de langage, mais tous les systèmes d'IA ne sont pas des LLM.

**Notre objectif final : comprendre ces idées une par une, les programmer en Java 8, puis utiliser les plus utiles pour améliorer les recommandations, les recherches et les statistiques de BoxyMovies.**
