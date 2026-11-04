# Entraînement, fine-tuning, RAG et agents

**Toi :** Si je veux un assistant qui connaisse mes documents, dois-je réentraîner une IA ?

**Moi :** Pas nécessairement. Plusieurs techniques répondent à des besoins différents. Il faut surtout comprendre ce que chacune change.

## Préentraînement

C'est la phase très coûteuse pendant laquelle un grand modèle apprend des régularités générales. Elle mobilise d'importants volumes de données, de calcul et d'ingénierie.

## Fine-tuning

Le **fine-tuning** poursuit l'entraînement d'un modèle préexistant sur des données adaptées à un objectif particulier. Il peut modifier le style, le comportement ou certaines compétences. Il n'est pas une méthode fiable pour maintenir à jour une grande base de faits changeants.

## RAG : rechercher avant de répondre

**Toi :** Et pour consulter mes documents internes ?

**Moi :** Le **RAG**, pour *Retrieval-Augmented Generation*, permet de rechercher des passages pertinents dans une source externe, puis de les transmettre au modèle dans le contexte de sa réponse.

Imagine un bibliothécaire : avant de répondre, il cherche les pages pertinentes, les lit et prépare une synthèse. Le modèle peut citer les documents utilisés, si le système le permet.

Le RAG ne garantit ni la pertinence des passages récupérés ni une réponse exacte. Les droits d'accès, la qualité de l'index et la vérification des citations sont essentiels.

## Les agents

Un **agent** combine généralement un modèle avec des outils, un objectif et une boucle de décisions. Il peut planifier, effectuer une action, observer le résultat puis décider de la suite.

**Toi :** Est-ce la même chose qu'un chatbot ?

**Moi :** Non. Un chatbot échange des messages. Un agent peut aussi agir dans un environnement. Plus il possède d'autonomie, plus il faut encadrer les permissions, les erreurs, les coûts et les conséquences des actions.

## Comparaison simple

Préentraînement : construire des capacités générales. Fine-tuning : adapter les paramètres. RAG : ajouter des informations externes au moment de la réponse. Agent : orchestrer des décisions et des outils.

## À retenir

Ces techniques sont complémentaires, pas interchangeables. Pour des informations actualisées et vérifiables, la récupération documentaire est souvent plus adaptée qu'un réentraînement complet.

**Question suivante :** pourquoi un modèle peut-il affirmer des choses fausses ?
