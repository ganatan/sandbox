# Intelligence artificielle — Histoire et concepts

**[Lire d'abord : l'IA expliquée simplement (niveau 10 ans)](001-ia-expliquee-simplement.md)**

## Parcours pratique Java 8 — 10 tutoriels

Chaque chapitre explique un concept avec des mots simples, un exemple cinéma, un programme `Main.java`, les commandes `javac` et `java`, le résultat attendu et un exercice. Aucun téléchargement nécessaire.

1. [Introduction : l'IA comme si j'avais 10 ans](001-ia-expliquee-simplement.md)
2. [Comment une machine apprend](002-comment-une-machine-apprend.md)
3. [Les nombres utiles pour l'IA](003-les-nombres-utiles-pour-ia.md)
4. [Représenter un film avec des nombres](004-representer-un-film-avec-des-nombres.md)
5. [Trouver des films similaires : 1-NN puis KNN](005-trouver-des-films-similaires-knn.md)
6. [Faire des groupes avec K-means](006-faire-des-groupes-kmeans.md)
7. [Prédire un nombre : régression linéaire](007-predire-un-nombre-regression-lineaire.md)
8. [Prédire oui ou non : classification](008-predire-oui-ou-non-classification.md)
9. [Détecter les valeurs bizarres : anomalies](009-detecter-les-valeurs-bizarres.md)
10. [Comprendre les neurones artificiels](010-comprendre-les-neurones.md)
11. [Comprendre ChatGPT, tokens et LLM](011-comprendre-chatgpt-et-les-llm.md)

## Objectif

Comprendre progressivement l'intelligence artificielle avant de programmer des expériences en Java 8, sans Internet et sans bibliothèque externe, puis réutiliser ces connaissances pour un site de cinéma comme BoxyMovies.

## 1. Qu'est-ce que l'intelligence artificielle ?

L'intelligence artificielle (IA) est un domaine de l'informatique qui étudie les systèmes capables d'effectuer des tâches comme le raisonnement, la classification, la prédiction, la planification, la reconnaissance de formes ou la génération de contenu.

L'IA ne désigne pas uniquement ChatGPT ou les modèles de langage. Elle comprend aussi les systèmes à règles, la recherche algorithmique et les méthodes statistiques.

### Vocabulaire fondamental

| Terme | Définition | Exemple cinéma |
|---|---|---|
| Algorithme | Suite d'instructions permettant de résoudre un problème | Trier des films par note |
| Modèle | Fonction ou système produisant une décision à partir d'entrées | Prédire les recettes d'un film |
| Caractéristique (feature) | Information utilisée en entrée | Durée, année, genres |
| Dataset | Ensemble d'exemples | Collection de films et caractéristiques |
| Label (cible) | Réponse connue à apprendre | Succès commercial : oui ou non |
| Entraînement | Ajustement des paramètres grâce aux données | Estimer les coefficients d'une régression |
| Inférence | Application d'un modèle à un nouvel exemple | Prédire pour un nouveau film |
| Paramètre | Valeur ajustée par l'apprentissage | Coefficient d'une régression |
| Hyperparamètre | Réglage choisi pour l'algorithme | Nombre k de voisins dans KNN |
| Généralisation | Capacité à fonctionner sur des exemples inconnus | Prédire sur les films récents non utilisés pour l'entraînement |

## 2. Histoire de l'IA

### 1943 — Le neurone artificiel

Warren McCulloch et Walter Pitts proposent une représentation mathématique simplifiée du neurone. Cette approche est une fondation historique des réseaux de neurones.

### 1950 — Alan Turing

Alan Turing publie *Computing Machinery and Intelligence*. Il étudie la question de l'intelligence des machines et propose un jeu d'imitation devenu célèbre sous le nom de test de Turing. Ce test ne constitue pas une mesure exhaustive de l'intelligence.

### 1956 — Dartmouth

L'atelier de Dartmouth, organisé à partir d'une proposition de John McCarthy, Marvin Minsky, Nathaniel Rochester et Claude Shannon, est généralement considéré comme un événement fondateur de l'intelligence artificielle comme discipline de recherche.

### Fin des années 1950 — Le perceptron

Frank Rosenblatt développe le perceptron : un modèle pouvant apprendre une frontière de décision linéaire à partir d'exemples. Un perceptron monocouche ne résout pas le problème XOR dans sa représentation habituelle.

### Années 1970–1980 — Les systèmes experts

Les systèmes experts représentent des connaissances à l'aide de règles explicites, souvent sous la forme **SI condition ALORS action**. Leur comportement peut être expliqué, mais leurs règles deviennent difficiles à entretenir à grande échelle.

### Années 1980–2000 — L'apprentissage statistique

Développement des arbres de décision, méthodes bayésiennes, machines à vecteurs de support et réseaux neuronaux multicouches. Les paramètres sont progressivement appris à partir de données plutôt que tous écrits à la main.

### Années 2000 — Données et puissance de calcul

La multiplication des données et l'évolution du matériel favorisent l'usage du machine learning dans la recherche, la recommandation et la reconnaissance de formes.

### 2012 — AlexNet

Les performances d'AlexNet lors de la compétition ImageNet marquent un tournant pour le deep learning appliqué aux images.

### 2017 — Transformer

L'article *Attention Is All You Need* introduit l'architecture Transformer fondée sur des mécanismes d'attention. Cette famille d'architectures jouera un rôle majeur dans les grands modèles de langage.

### Années 2020 — IA générative

Les modèles génératifs se développent fortement pour le texte, l'image, l'audio et le code. Ils peuvent produire des résultats plausibles mais incorrects : la vérification reste nécessaire.

## 3. Programmation classique, IA symbolique et apprentissage

### Programmation classique

Le développeur définit exactement les règles. Exemple : recommander un film si sa note est supérieure ou égale à 7.

### IA symbolique

Le système représente des faits, des règles et parfois des mécanismes de déduction. Exemple : combiner plusieurs préférences pour expliquer une recommandation.

### Machine learning

Un algorithme ajuste un modèle à partir d'exemples. Exemple : apprendre des paramètres permettant d'estimer les recettes d'un film.

**Différence essentielle :** un système à règles suit des conditions explicites ; un modèle entraîné apprend certains paramètres à partir de données. Les deux méthodes peuvent être combinées.

## 4. Grandes familles d'apprentissage

### Apprentissage supervisé

Les exemples contiennent une entrée X et une réponse attendue y.

- **Classification :** prédire une catégorie, par exemple succès commercial ou non selon une définition explicite.
- **Régression :** prédire une grandeur numérique, par exemple des recettes.

Algorithmes à découvrir : KNN, régression linéaire, régression logistique, arbres de décision et Naive Bayes.

### Apprentissage non supervisé

Les données ne comportent pas de catégorie cible à reproduire. Le modèle recherche des structures ou des groupes.

Algorithmes : K-means, regroupement hiérarchique, réduction de dimension.

Application cinéma : rechercher des groupes de films aux caractéristiques semblables, sans imposer à l'avance une étiquette de genre.

### Apprentissage par renforcement

Un agent prend des décisions et reçoit des récompenses. Il apprend une stratégie visant à maximiser une récompense cumulée.

Application pédagogique : simuler un moteur qui choisit des films pour un utilisateur fictif et reçoit un retour positif ou négatif.

### Deep learning

Sous-domaine du machine learning utilisant des réseaux de neurones à plusieurs couches. Il est notamment utilisé pour le traitement d'images, du son et du langage.

### IA générative

Méthodes capables de générer du contenu à partir de représentations apprises. Les grands modèles de langage (LLM) font partie de cette famille.

## 5. Concepts mathématiques indispensables

| Concept | Ce qu'il faut comprendre | Application |
|---|---|---|
| Moyenne | Tendance centrale des valeurs | Note moyenne |
| Variance / écart-type | Dispersion des données | Variations des budgets |
| Vecteur | Liste ordonnée de caractéristiques numériques | Représenter un film |
| Distance euclidienne | Proximité entre vecteurs | Rechercher des films similaires |
| Matrice | Tableau de nombres | Dataset ou poids neuronaux |
| Probabilité conditionnelle | Probabilité en connaissant une information | Classifier un film |
| Dérivée | Variation locale d'une fonction | Optimiser une erreur |
| Gradient | Direction de variation dans plusieurs dimensions | Ajuster les poids |
| Normalisation | Mise à l'échelle des variables | Comparer budget et durée |

Ces notions seront étudiées progressivement, avec des calculs manuels avant le code.

## 6. Concepts liés aux données

### Dataset

Un ensemble structuré d'observations. Exemple fictif : année, durée, genre, budget et recettes de plusieurs films.

### Feature engineering

Choisir et transformer les informations utilisées en entrée : année, genres encodés numériquement, durée, statistiques disponibles.

### Entraînement, validation, test

- **Entraînement :** ajuster le modèle.
- **Validation :** sélectionner les réglages.
- **Test :** estimer la qualité finale sur des exemples non utilisés pour les choix précédents.

### Surapprentissage

Un modèle mémorise les exemples d'entraînement et fonctionne mal sur de nouveaux exemples.

### Fuite de données

Une information indisponible au moment d'une vraie prédiction est utilisée par erreur pendant l'entraînement. Exemple : utiliser les recettes finales pour prédire ces mêmes recettes avant la sortie.

### Métriques

Pour la classification : précision, rappel, F1, matrice de confusion. Pour la régression : MAE, MSE, RMSE. Il faut comparer un modèle à une méthode de référence simple.

## 7. Comprendre les réseaux de neurones

Un neurone artificiel calcule une combinaison pondérée d'entrées, ajoute un biais puis applique éventuellement une fonction d'activation.

Formule : **z = w₁x₁ + w₂x₂ + … + b**.

Notions à maîtriser :

- Poids et biais.
- Fonction d'activation.
- Fonction de perte.
- Descente de gradient.
- Taux d'apprentissage.
- Rétropropagation.
- Couche d'entrée, couches cachées, sortie.
- Époque d'entraînement et batch.

Ces mécanismes peuvent être reproduits à petite échelle en Java 8 avec des tableaux de `double`.

## 8. Comprendre les Transformers et les LLM

Un LLM est un modèle de langage de grande taille. Les notions essentielles sont :

- **Tokenisation :** découper le texte en unités.
- **Embedding :** représenter les unités par des vecteurs.
- **Attention :** calculer l'importance relative d'éléments d'une séquence.
- **Transformer :** architecture de réseaux de neurones reposant sur l'attention.
- **Préentraînement :** apprentissage à partir de nombreuses données.
- **Inférence :** génération de sorties à l'aide d'un modèle entraîné.
- **Fine-tuning :** ajustement supplémentaire d'un modèle existant.
- **RAG :** ajout d'une recherche documentaire à un système génératif.
- **Hallucination :** production d'une réponse plausible mais erronée ou non étayée.

**Limite matérielle :** sans téléchargement ni modèle préentraîné, Java 8 seul ne permet pas de faire fonctionner de manière réaliste un LLM moderne. On peut en revanche programmer des démonstrations simplifiées de tokenisation, génération statistique et attention.

## 9. Programme d'expérimentation prévu en Java 8

Chaque exercice utilisera uniquement le JDK et des données fictives.

| Ordre | Expérimentation | Objectif |
|---|---|---|
| 1 | Système expert | Distinguer règles et apprentissage |
| 2 | Statistiques | Comprendre moyenne et dispersion |
| 3 | Vecteurs et distances | Calculer la proximité entre films |
| 4 | KNN | Classifier à partir des voisins |
| 5 | K-means | Découvrir automatiquement des groupes |
| 6 | Régression linéaire | Estimer une valeur |
| 7 | Régression logistique | Prédire une classe binaire |
| 8 | Arbre de décision | Apprendre des règles depuis les données |
| 9 | Naive Bayes | Classifier avec des probabilités |
| 10 | Détection d'anomalies | Détecter des valeurs atypiques |
| 11 | Perceptron | Apprendre des poids |
| 12 | Réseau multicouche | Comprendre gradient et rétropropagation |
| 13 | Mini modèle de langage | Étudier des mécanismes génératifs simples |
| 14 | Recommandation cinéma | Combiner les méthodes pertinentes |

Pour chaque expérience : expliquer le problème, présenter la formule, calculer un exemple à la main, écrire le code Java 8, tester, expliquer les limites et identifier une application potentielle à BoxyMovies.

## 10. Contraintes techniques du laboratoire

- Java 8 uniquement.
- Aucun accès Internet ni téléchargement.
- Aucune bibliothèque externe nécessaire.
- Compilation avec `javac`, exécution avec `java`.
- Ant ou JUnit uniquement s'ils sont déjà disponibles.
- Aucun code ou donnée confidentielle de mission : exemples synthétiques et travaux autorisés uniquement.

L'objectif chez soi sera de réimplémenter les algorithmes utiles dans le backend Node.js/TypeScript de BoxyMovies et d'afficher les résultats avec Angular.

## 11. Questions à maîtriser avant de programmer

1. Quelle différence existe entre IA, machine learning et deep learning ?
2. Pourquoi un système expert n'est-il pas un modèle entraîné ?
3. Qu'est-ce qu'une caractéristique et une cible ?
4. Quelle différence existe entre classification et régression ?
5. Que signifie apprentissage non supervisé ?
6. Pourquoi normaliser certaines données ?
7. Que signifient entraînement, validation et test ?
8. Qu'est-ce que le surapprentissage ?
9. Quel rôle joue un gradient dans un réseau neuronal ?
10. Que sont les tokens, embeddings, attention et Transformers ?
11. Pourquoi faut-il vérifier les sorties d'une IA générative ?
12. Comment évaluer qu'une recommandation de film est réellement utile ?

## 12. Références historiques pour approfondir chez soi

- Alan Turing, *Computing Machinery and Intelligence*, 1950.
- McCarthy, Minsky, Rochester et Shannon, *A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence*, 1955.
- Rosenblatt, travaux sur le perceptron, fin des années 1950.
- Rumelhart, Hinton et Williams, *Learning representations by back-propagating errors*, 1986.
- Krizhevsky, Sutskever et Hinton, *ImageNet Classification with Deep Convolutional Neural Networks*, 2012.
- Vaswani et collaborateurs, *Attention Is All You Need*, 2017.

---

**Étape suivante :** créer des tutoriels indépendants, avec démonstrations mathématiques, fichiers Java 8 complets et exécution sans dépendance, en commençant par un système expert.
