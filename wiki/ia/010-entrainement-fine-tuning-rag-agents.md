# Comment fonctionne une IA conversationnelle

Ce chapitre présente les notions essentielles dans un langage simple, sans dialogue ni programmation.

## 1. Comprendre le principe

L'utilisateur envoie une demande à une application.

L'application rassemble le contexte disponible.

Ce contexte peut contenir des consignes et des documents.

Le modèle traite uniquement les informations qui lui sont accessibles.

## 2. Une idée fondamentale

Le texte est découpé en tokens.

Un token peut correspondre à un mot ou une partie de mot.

Chaque unité est convertie en représentation numérique.

Le découpage dépend du modèle.

## 3. Un exemple à imaginer

Les embeddings sont des vecteurs de nombres.

Ils représentent des régularités apprises pendant l'entraînement.

Les couches du modèle transforment ces représentations.

Le sens dépend du contexte et des relations avec les autres éléments.

## 4. Comment cela fonctionne

Le Transformer fait interagir les éléments autorisés de la séquence.

L'attention est un mécanisme de calcul numérique.

Elle aide à exploiter le contexte d'une phrase.

Elle ne correspond pas à une pensée consciente.

## 5. Le contexte historique ou pratique

Le modèle calcule une distribution de possibilités pour le prochain token.

Une méthode de génération choisit une continuation.

Le calcul se répète pour construire la réponse.

Une formulation fluide n'est pas une vérification des faits.

## 6. Les conséquences

Le préentraînement construit des capacités générales.

Le fine-tuning adapte les paramètres sur des données spécifiques.

Il peut améliorer un comportement ou une tâche ciblée.

Il n'est pas idéal pour maintenir une encyclopédie toujours actualisée.

## 7. Les limites et précautions

Le RAG recherche des informations dans des documents externes.

Les passages pertinents sont ajoutés au contexte.

Cela peut améliorer les réponses sur des sources spécialisées.

Une mauvaise sélection documentaire peut pourtant créer des erreurs.

## 8. Ce qu'il faut retenir

Les outils de recherche ou de calcul sont distincts du modèle.

Une mémoire de produit éventuelle n'est pas un entraînement automatique.

Les sources et résultats doivent être vérifiés.

La qualité dépend de l'ensemble du système, pas seulement du LLM.

## Résumé

- L'utilisateur envoie une demande à une application.
- Le texte est découpé en tokens.
- Les embeddings sont des vecteurs de nombres.
- Le Transformer fait interagir les éléments autorisés de la séquence.
- Le modèle calcule une distribution de possibilités pour le prochain token.
- Le préentraînement construit des capacités générales.
- Le RAG recherche des informations dans des documents externes.
- Les outils de recherche ou de calcul sont distincts du modèle.
