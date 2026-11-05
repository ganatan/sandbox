# De la programmation traditionnelle à l'apprentissage automatique

## Introduction

Pendant des décennies, les développeurs ont construit des logiciels en expliquant précisément aux ordinateurs ce qu'ils devaient faire et comment ils devaient le faire.

Aujourd'hui, nous sommes capables de construire des systèmes qui apprennent à réaliser certaines tâches à partir d'exemples, sans avoir à écrire explicitement toutes les règles nécessaires.

Cette transformation modifie notre manière de programmer, de résoudre les problèmes, de concevoir les applications et même de définir ce que signifie être développeur.

Mais une idée est essentielle : **l'apprentissage automatique ne remplace pas la programmation traditionnelle. Il ajoute une nouvelle manière de résoudre des problèmes que la programmation classique traite parfois très difficilement.**

Pour comprendre cette révolution, il faut revenir aux origines de l'informatique.

---

## 1. La programmation traditionnelle : écrire les règles

Imaginons que nous soyons en 1985.

Un développeur doit créer un logiciel capable de déterminer si un client peut obtenir un crédit.

Il doit définir les règles métier :

- Le client doit être majeur.
- Son revenu doit dépasser un certain montant.
- Son endettement doit rester sous un seuil.
- Il ne doit pas présenter certains incidents bancaires.

Le développeur traduit ces règles dans un langage informatique.

Le programme reçoit les informations du client, applique les conditions et produit une décision.

### Fonctionnement

```text
Règles écrites par le développeur
                +
        Données du client
                |
                v
       Programme informatique
                |
                v
       Accepté ou refusé
```

Cette méthode est extrêmement puissante.

Elle permet de construire des systèmes bancaires, des logiciels de comptabilité, des applications industrielles, des systèmes de réservation et presque toute l'infrastructure numérique moderne.

Elle possède une qualité fondamentale : si les règles sont déterministes et les entrées identiques, le résultat sera identique.

Nous pouvons tester le logiciel, comprendre ses décisions et identifier les erreurs.

Mais cette méthode rencontre une difficulté majeure.

---

## 2. Lorsque nous ne connaissons pas les règles

Imaginons maintenant que nous devions développer un programme capable de reconnaître un chat sur une photographie.

Un chat possède généralement :

- Quatre pattes.
- Deux oreilles.
- Des moustaches.
- Une queue.
- Deux yeux.

Nous pourrions essayer de programmer ces caractéristiques.

Mais rapidement, les difficultés apparaissent.

Un chat peut être noir, blanc, gris ou tigré.

Il peut être assis, couché, caché, photographié de face ou de dos.

Parfois, nous ne voyons que sa tête.

Certaines races n'ont presque pas de poils.

Et surtout, un chien possède également quatre pattes, deux oreilles, une queue et des moustaches.

Comment écrire des règles capables de couvrir toutes ces situations ?

Nous pouvons ajouter des centaines de conditions, puis des milliers.

Mais chaque nouvelle règle risque d'introduire de nouveaux problèmes.

### Le problème fondamental

**Nous savons souvent reconnaître quelque chose sans être capables d'expliquer précisément toutes les règles qui nous permettent de le reconnaître.**

Un enfant peut distinguer un chat d'un chien avant de connaître les mathématiques ou l'informatique.

Il a simplement rencontré des exemples.

Et si nous pouvions faire quelque chose de comparable avec un ordinateur ?

C'est précisément l'idée qui a conduit au développement de l'apprentissage automatique.

---

## 3. L'idée révolutionnaire : apprendre plutôt que programmer toutes les règles

Dans la programmation traditionnelle, le développeur fournit les règles et les données.

Le programme calcule le résultat.

Dans l'apprentissage automatique, nous pouvons fournir des données accompagnées de résultats connus et demander à un algorithme de construire un modèle capable de retrouver des relations entre ces informations.

### Exemple

Nous disposons de 100 000 photographies.

Pour chacune, nous savons si elle représente un chat ou un chien.

Nous présentons ces photographies à un système d'apprentissage.

Au départ, le modèle ne sait pas distinguer les deux animaux.

Pendant l'entraînement, il produit des prédictions, compare celles-ci aux bonnes réponses et ajuste progressivement ses paramètres pour réduire ses erreurs.

Après de nombreuses itérations, il peut devenir capable de reconnaître des chats et des chiens sur des photographies qu'il n'a jamais rencontrées.

C'est ce que nous appelons la **généralisation**.

### Fonctionnement

```text
Photographies + Réponses connues
                |
                v
      Algorithme d'apprentissage
                |
                v
          Modèle entraîné
                |
                v
         Nouvelle photographie
                |
                v
           Chat ou chien
```

Il faut cependant être précis.

Le modèle n'apprend pas nécessairement des règles explicites comparables à des conditions if/else.

Il apprend des paramètres mathématiques qui lui permettent de produire des prédictions.

Le développeur ne cherche donc plus uniquement à décrire la solution.

Il cherche à construire les conditions dans lesquelles une solution statistique pourra être apprise.

C'est une nouvelle philosophie de l'informatique.

---

## 4. Une histoire qui commence bien avant ChatGPT

L'intelligence artificielle n'est pas apparue en 2022.

Son histoire s'étend sur plus de 70 ans et certaines de ses idées fondamentales sont encore plus anciennes.

### 1936–1950 : Alan Turing

En 1936, Alan Turing formalise la notion de machine universelle.

Cette idée constitue l'une des fondations théoriques de l'informatique moderne.

En 1950, il publie un article célèbre dans lequel il pose la question : les machines peuvent-elles penser ?

Il propose une manière d'étudier cette question à travers le comportement observable d'une machine lors d'une conversation.

Cette réflexion influencera durablement l'histoire de l'intelligence artificielle.

### 1956 : la conférence de Dartmouth

En 1956, plusieurs chercheurs se réunissent à Dartmouth, aux États-Unis.

Parmi eux figurent John McCarthy, Marvin Minsky, Claude Shannon et Nathaniel Rochester, associés à la proposition fondatrice.

Cette conférence est généralement considérée comme un événement fondateur de l'intelligence artificielle en tant que domaine de recherche.

L'ambition est immense : comprendre comment les machines pourraient reproduire certaines capacités intellectuelles humaines.

### 1957–1958 : le perceptron

Frank Rosenblatt développe le perceptron.

Il s'agit d'un modèle capable d'apprendre à classer certains motifs.

Le perceptron est un ancêtre conceptuel des réseaux neuronaux modernes.

Ses capacités restent limitées, mais il démontre qu'une machine peut ajuster automatiquement certains paramètres à partir d'exemples.

### 1959 : Arthur Samuel

Arthur Samuel développe chez IBM un programme de jeu de dames capable d'améliorer ses performances grâce à l'expérience.

Il contribue à populariser l'expression **machine learning**.

L'idée d'un programme dont les performances évoluent par apprentissage devient concrète.

---

## 5. Les systèmes experts et les premiers obstacles

Dans les années 1970 et 1980, une autre approche de l'intelligence artificielle connaît un développement important : les systèmes experts.

Le principe consiste à demander à des spécialistes de formaliser leurs connaissances.

Par exemple, un médecin décrit les symptômes associés à certaines maladies.

Des informaticiens traduisent ces connaissances en règles.

Le logiciel peut alors raisonner à partir de ces règles.

C'est une forme d'intelligence artificielle dite **symbolique**.

Elle ne repose pas nécessairement sur l'apprentissage automatique.

### Les limites

Les systèmes experts rencontrent plusieurs difficultés :

- Les connaissances humaines sont difficiles à formaliser.
- Les exceptions deviennent nombreuses.
- Les règles peuvent entrer en contradiction.
- La maintenance devient coûteuse.
- Les systèmes s'adaptent difficilement aux situations nouvelles.

Un expert peut savoir prendre une décision sans être capable d'en énoncer toutes les règles.

Cette difficulté constitue l'une des raisons pour lesquelles l'apprentissage à partir de données devient progressivement plus intéressant.

### Les hivers de l'intelligence artificielle

À plusieurs reprises, les promesses de l'IA dépassent les résultats obtenus.

Les investissements diminuent.

Des projets sont abandonnés.

L'enthousiasme retombe.

On parle des **hivers de l'intelligence artificielle**, notamment dans les années 1970 et à la fin des années 1980.

Mais les recherches ne disparaissent pas.

En 1986, les travaux de David Rumelhart, Geoffrey Hinton et Ronald Williams contribuent à populariser la rétropropagation des erreurs pour entraîner les réseaux neuronaux multicouches.

En 1989, Yann LeCun et ses collaborateurs démontrent l'intérêt des réseaux neuronaux pour reconnaître des chiffres manuscrits.

La révolution continue à se préparer.

---

## 6. Pourquoi la révolution arrive-t-elle maintenant ?

Pourquoi des idées développées dans les années 1950 commencent-elles à transformer massivement notre quotidien dans les années 2010 et 2020 ?

Parce que plusieurs évolutions technologiques ont fini par converger.

### 6.1. L'explosion des données

Internet, les smartphones, les appareils photo numériques, les réseaux sociaux et les systèmes informatiques ont produit des quantités considérables de données.

Ces données comprennent :

- Des textes.
- Des photographies.
- Des vidéos.
- Des enregistrements audio.
- Des mesures industrielles.
- Des transactions.
- Des documents scientifiques.

L'apprentissage automatique dépend fortement de la disponibilité de données adaptées.

L'explosion des données numériques a donc rendu possibles des entraînements beaucoup plus ambitieux.

### 6.2. La puissance de calcul

Les ordinateurs des années 1950 disposaient de ressources extrêmement limitées.

Les réseaux neuronaux modernes peuvent nécessiter des quantités considérables de calculs.

Les GPU, initialement développés notamment pour les applications graphiques, se sont révélés très efficaces pour certains calculs massivement parallèles.

Les infrastructures modernes permettent désormais d'entraîner des modèles autrefois irréalisables.

### 6.3. Les progrès des algorithmes

La puissance matérielle ne suffit pas.

Les chercheurs ont également développé :

- De nouvelles architectures neuronales.
- De meilleures méthodes d'optimisation.
- Des techniques de régularisation.
- Des méthodes d'entraînement plus efficaces.
- Des mécanismes d'attention.

Ces progrès ont considérablement amélioré les performances.

### 6.4. Le cloud computing

Le cloud a permis de mutualiser des ressources informatiques considérables.

Les entreprises et les laboratoires peuvent utiliser des infrastructures spécialisées sans nécessairement posséder tous les équipements.

Les modèles entraînés peuvent également être accessibles à distance grâce à des API.

### Conclusion

La révolution actuelle n'est pas une invention soudaine.

C'est le résultat de plusieurs décennies de recherche qui ont rencontré les conditions techniques et économiques nécessaires à leur exploitation à grande échelle.

---

## 7. Les grandes étapes modernes

### 1997 : Deep Blue

L'ordinateur Deep Blue d'IBM bat Garry Kasparov dans un match d'échecs.

Cet événement marque l'histoire de l'informatique.

Il faut toutefois préciser que Deep Blue repose principalement sur des techniques de recherche algorithmique et d'évaluation des positions, plutôt que sur l'apprentissage profond moderne.

### 2012 : AlexNet

Un réseau neuronal profond obtient des résultats spectaculaires dans la compétition ImageNet.

C'est un tournant majeur pour la reconnaissance d'images.

L'apprentissage profond attire alors une attention scientifique et industrielle considérable.

### 2016 : AlphaGo

Le système AlphaGo de DeepMind bat Lee Sedol au jeu de go.

Il associe notamment :

- L'apprentissage profond.
- L'apprentissage par renforcement.
- Des techniques de recherche.

Cet événement démontre la puissance de la combinaison de plusieurs approches.

### 2017 : le Transformer

Des chercheurs de Google présentent une architecture fondée sur les mécanismes d'attention.

Cette architecture est décrite dans l'article **Attention Is All You Need**.

Elle jouera un rôle majeur dans le développement des grands modèles de langage.

### 2022 : ChatGPT

OpenAI rend accessible au grand public une interface conversationnelle permettant d'interagir naturellement avec un modèle de langage.

La nouveauté fondamentale n'est pas l'invention de l'intelligence artificielle.

C'est notamment d'avoir rendu une technologie complexe accessible au moyen d'une interface extrêmement simple : une conversation.

### 2023–2026 : l'IA devient un outil de travail

Les assistants de programmation, les modèles multimodaux et les agents capables d'utiliser des outils étendent les applications de l'IA.

L'IA intervient désormais dans la rédaction, la programmation, la recherche, la création de contenus et certaines tâches professionnelles.

---

## 8. Intelligence artificielle, machine learning et deep learning

Ces trois notions sont souvent confondues.

Elles ne désignent pourtant pas exactement la même chose.

### Intelligence artificielle

L'intelligence artificielle désigne un ensemble de méthodes permettant aux machines de réaliser des tâches associées à certaines capacités intellectuelles.

Elle comprend notamment des approches symboliques, des méthodes de recherche et des méthodes d'apprentissage.

### Machine learning

L'apprentissage automatique est un sous-ensemble de l'intelligence artificielle.

Il regroupe les méthodes permettant d'apprendre des modèles à partir de données ou d'expériences.

### Deep learning

L'apprentissage profond est un sous-ensemble du machine learning.

Il utilise des réseaux neuronaux comportant plusieurs couches de traitement.

### Représentation

```text
Intelligence artificielle
|
+-- Approches symboliques
|
+-- Apprentissage automatique
    |
    +-- Régression
    |
    +-- Arbres de décision
    |
    +-- Autres méthodes statistiques
    |
    +-- Apprentissage profond
        |
        +-- Réseaux neuronaux
        +-- Transformers
        +-- Autres architectures profondes
```

Tout apprentissage profond relève du machine learning.

Mais tout machine learning n'est pas du deep learning.

Et toute intelligence artificielle ne repose pas nécessairement sur le machine learning.

---

## 9. Les différentes formes d'apprentissage

### 9.1. L'apprentissage supervisé

Le système reçoit des exemples accompagnés des bonnes réponses.

Exemple :

- Photographie A : chat.
- Photographie B : chien.
- Photographie C : chat.

Le modèle apprend à associer certaines caractéristiques aux catégories attendues.

Il peut ensuite produire des prédictions sur de nouvelles photographies.

### 9.2. L'apprentissage non supervisé

Le système reçoit des données sans disposer systématiquement de réponses prédéfinies.

Il cherche des structures, des regroupements ou des relations.

Exemple : identifier des groupes de clients présentant des comportements similaires.

### 9.3. L'apprentissage par renforcement

Un système apprend à privilégier certaines actions en fonction des récompenses qu'il reçoit.

Cette approche est utilisée notamment dans certains systèmes de jeu, de robotique et de contrôle.

### 9.4. L'apprentissage auto-supervisé

Le système construit des tâches d'entraînement à partir des données elles-mêmes.

Par exemple, un modèle de langage peut apprendre à prédire des éléments de texte à partir de leur contexte.

Cette méthode permet d'exploiter de grandes quantités de données sans nécessiter une annotation humaine complète de chaque exemple.

---

## 10. Pourquoi l'apprentissage automatique est-il utile face aux problèmes complexes ?

Un algorithme traditionnel est particulièrement adapté lorsque nous connaissons précisément les opérations à effectuer.

Exemples :

- Calculer une TVA.
- Trier des résultats.
- Vérifier un mot de passe.
- Contrôler une transaction.
- Appliquer une règle de gestion.

Mais certains problèmes possèdent une caractéristique particulière.

Il est difficile d'en écrire les règles, alors qu'il est possible de rassembler des exemples.

### Reconnaissance médicale

Un médecin peut reconnaître certains indices visuels associés à une maladie.

Mais écrire un programme décrivant toutes les variations possibles de ces indices serait extrêmement difficile.

Un modèle entraîné sur des images correctement annotées peut apprendre des régularités statistiques utiles.

Il doit cependant être évalué rigoureusement et ne remplace pas automatiquement le jugement médical.

### Détection des fraudes

Un système traditionnel peut appliquer des règles explicites.

Par exemple :

- Montant inhabituel.
- Pays différent.
- Fréquence excessive.
- Transaction à une heure inhabituelle.

Mais les fraudeurs modifient leurs comportements.

Un modèle peut détecter des combinaisons de caractéristiques difficiles à anticiper manuellement.

Les systèmes performants peuvent combiner des règles explicites et des modèles statistiques.

### Reconnaissance vocale

La reconnaissance vocale doit gérer :

- Les accents.
- Les bruits.
- Les différences de prononciation.
- La vitesse de parole.
- Le contexte.

Le nombre de situations possibles est immense.

L'apprentissage automatique a permis des progrès majeurs dans ce domaine.

### Maintenance prédictive

Une machine industrielle produit des mesures :

- Température.
- Vibrations.
- Pression.
- Consommation électrique.

Un modèle peut apprendre certaines relations entre ces mesures et des pannes passées.

Il peut ensuite produire un indicateur de risque permettant d'anticiper une intervention.

### Le principe fondamental

L'apprentissage automatique offre une stratégie différente : apprendre une approximation utile à partir des données.

Un modèle ne découvre pas automatiquement une vérité universelle.

Il apprend des relations statistiques qui peuvent être utiles dans certaines conditions.

---

## 11. La dépendance aux données

C'est l'une des notions les plus importantes pour comprendre les limites de l'apprentissage automatique.

Un logiciel traditionnel peut fonctionner parfaitement avec très peu de données si ses règles sont correctes.

Un modèle d'apprentissage dépend fortement de la qualité et de la représentativité des exemples utilisés pendant son entraînement.

### Exemple

Imaginons un modèle entraîné pour reconnaître des chats.

Nous lui présentons 100 000 photographies.

Mais 95 % des chats sont photographiés à l'intérieur.

Presque tous les chiens sont photographiés dans des jardins.

Le modèle pourrait apprendre à associer les environnements intérieurs aux chats et les jardins aux chiens.

Il obtiendrait peut-être de bons résultats sur les données d'entraînement.

Mais il pourrait commettre des erreurs sur de nouvelles photographies.

C'est un exemple de corrélation trompeuse.

### Les principaux problèmes

| Problème | Conséquence |
|---|---|
| Données insuffisantes | Apprentissage peu fiable |
| Données incorrectes | Prédictions erronées |
| Données déséquilibrées | Performances inégales |
| Données non représentatives | Mauvaise généralisation |
| Données anciennes | Dégradation possible |
| Données sensibles | Risques de confidentialité |
| Données mal étiquetées | Mauvaises associations |

Les projets de machine learning nécessitent donc un véritable travail d'ingénierie des données.

Il faut collecter, nettoyer, organiser, documenter et contrôler les informations.

Il faut également séparer les données utilisées pour l'entraînement de celles utilisées pour évaluer les performances.

---

## 12. Comprendre les erreurs d'un modèle

Imaginons un modèle capable de détecter une maladie rare.

Sur 10 000 personnes, 100 sont malades.

Le modèle identifie 90 personnes malades.

Mais il signale également 495 personnes saines comme potentiellement malades.

### Résultats

| Catégorie | Nombre |
|---|---:|
| Vrais positifs | 90 |
| Faux positifs | 495 |
| Faux négatifs | 10 |
| Vrais négatifs | 9 405 |

La sensibilité est de 90 %.

Cela signifie que 90 % des personnes réellement malades ont été détectées.

Mais la précision des résultats positifs est d'environ 15,4 %.

Cela signifie que parmi les personnes signalées comme malades, seulement 15,4 % sont réellement malades.

Cet exemple montre pourquoi une annonce affirmant qu'un modèle est précis à 90 % peut être trompeuse si elle ne précise pas la métrique utilisée.

Un ingénieur doit comprendre ce que mesure réellement son système.

---

## 13. La complexité de l'apprentissage automatique

L'apprentissage automatique ajoute plusieurs difficultés à celles de la programmation traditionnelle.

### 13.1. La complexité mathématique

L'apprentissage automatique repose notamment sur :

- Les statistiques.
- Les probabilités.
- L'algèbre linéaire.
- L'optimisation.

Pour entraîner un modèle, il faut généralement définir une fonction qui mesure l'erreur.

L'objectif est ensuite de rechercher des paramètres permettant de réduire cette erreur.

### Principe général

1. Le modèle produit une prédiction.
2. Nous mesurons son erreur.
3. Un algorithme ajuste ses paramètres.
4. Nous recommençons de nombreuses fois.

Le principe est simple.

Mais les calculs nécessaires peuvent être extrêmement complexes.

### 13.2. La complexité expérimentale

Un développeur traditionnel peut vérifier qu'une fonction retourne exactement la valeur attendue.

Avec un modèle statistique, le comportement dépend des données, de l'entraînement et de nombreux paramètres.

Il faut :

- Réaliser des expériences.
- Comparer des résultats.
- Détecter le surapprentissage.
- Mesurer la généralisation.
- Évaluer les erreurs.

### 13.3. La complexité opérationnelle

Une fois entraîné, le modèle doit être intégré dans une application.

Il faut gérer :

- Sa version.
- Ses performances.
- Son coût.
- Sa latence.
- Sa surveillance.
- Son éventuel réentraînement.

On parle alors de **MLOps**, par analogie avec le DevOps.

Un modèle peut devenir moins pertinent parce que les données du monde réel ont évolué.

On parle notamment de data drift ou de concept drift, selon la nature du changement.

### 13.4. Créer un modèle ou utiliser un modèle

Il faut distinguer deux activités.

**Créer et entraîner un modèle** peut nécessiter des compétences scientifiques avancées, des données spécialisées et des ressources de calcul importantes.

**Utiliser un modèle existant** peut être aussi simple que d'appeler une API depuis une application Node.js.

Aujourd'hui, un développeur peut intégrer des fonctionnalités d'IA sans entraîner lui-même un réseau neuronal.

---

## 14. Ce qui change dans la vie des développeurs

Pendant longtemps, le travail du développeur consistait principalement à traduire des besoins fonctionnels en structures informatiques.

Il concevait :

- Les composants.
- Les services.
- Les routes.
- Les requêtes SQL.
- Les validations.
- Les règles métier.
- Les architectures.

Avec l'apprentissage automatique et l'IA générative, deux transformations apparaissent.

### Première transformation : traiter des informations moins structurées

Prenons un site de cinéma.

Avec la programmation traditionnelle, nous pouvons facilement :

- Rechercher les films sortis en 1982.
- Trier les films par recettes.
- Calculer une rentabilité.
- Filtrer les réalisateurs.
- Comparer deux budgets.

Ces opérations reposent sur des règles explicites et des données structurées.

Mais imaginons une nouvelle fonctionnalité :

**Trouve-moi des films qui parlent de solitude, d'exploration et de la peur de l'inconnu.**

Cette recherche est plus difficile à implémenter avec de simples filtres SQL.

Un système fondé sur des représentations sémantiques, notamment des embeddings, peut comparer la signification approximative de descriptions de films avec celle de la demande.

Il devient possible de rechercher des contenus selon leur sens, et pas seulement selon les mots exacts.

Les deux méthodes peuvent être combinées.

Une recherche sémantique identifie des candidats.

PostgreSQL applique ensuite des filtres stricts sur les années, les notes ou les catégories.

### Deuxième transformation : l'IA participe à la création du logiciel

Les modèles de langage peuvent contribuer à :

- Écrire du code.
- Expliquer des erreurs.
- Proposer des tests.
- Documenter des architectures.
- Analyser des bases de code.
- Préparer des migrations.
- Identifier certaines anomalies.

Le développeur peut déléguer une partie de certaines tâches.

Mais cela ne signifie pas qu'il peut abandonner ses responsabilités techniques.

Un modèle peut générer un code syntaxiquement correct contenant une faille de sécurité, une mauvaise hypothèse métier ou une erreur de concurrence.

Le rôle du développeur évolue vers davantage de conception, de vérification, d'intégration et d'arbitrage.

**Un programme qui compile n'est pas nécessairement un bon programme.**

---

## 15. Comparaison des deux approches

| Critère | Programmation traditionnelle | Apprentissage automatique |
|---|---|---|
| Principe | Règles explicites | Modèle appris |
| Résultat | Souvent déterministe | Souvent statistique |
| Données | Selon le besoin | Essentielles à l'entraînement |
| Explicabilité | Généralement plus directe | Parfois difficile |
| Maintenance | Code et règles | Code, données et modèle |
| Adaptation | Modification des règles | Réentraînement ou adaptation |
| Tests | Résultats attendus | Évaluation statistique |
| Cas privilégiés | Calculs, règles métier, transactions | Reconnaissance, prédiction, langage |

Cette comparaison est une simplification.

Un modèle peut produire un résultat déterministe dans certaines conditions d'exécution.

Un logiciel traditionnel peut également utiliser des probabilités.

Et un système d'apprentissage automatique reste lui-même constitué de programmes traditionnels.

La différence porte principalement sur la manière dont le comportement recherché est obtenu.

---

## 16. Les avantages de l'apprentissage automatique

### Reconnaître des régularités complexes

Un modèle peut identifier des relations difficiles à formaliser manuellement.

### Exploiter de grandes quantités d'informations

Les systèmes modernes peuvent apprendre à partir de volumes considérables de données.

### Automatiser certaines tâches

La classification, la reconnaissance de formes et certaines analyses peuvent être partiellement automatisées.

### Produire des prédictions

Les modèles peuvent estimer des probabilités ou des valeurs futures à partir de données historiques.

### Faciliter les interactions

Les modèles de langage permettent d'utiliser le langage naturel pour accéder à certaines fonctionnalités informatiques.

### Compléter les systèmes existants

L'apprentissage automatique peut être intégré à des applications traditionnelles sans remplacer leur architecture fondamentale.

---

## 17. Les limites et les risques

### Les erreurs

Un modèle peut se tromper de manière difficile à anticiper.

### Les biais

Un modèle peut reproduire ou amplifier certains biais présents dans les données.

### L'explicabilité

Il peut être difficile de comprendre précisément pourquoi un modèle a produit une prédiction.

### Les coûts

L'entraînement et l'utilisation de certains modèles nécessitent des ressources importantes.

### La confidentialité

L'utilisation de données personnelles ou sensibles exige des précautions particulières.

### La sécurité

Les systèmes d'IA peuvent présenter des vulnérabilités spécifiques, notamment lorsqu'ils utilisent des outils ou manipulent des informations non fiables.

### Les hallucinations

Certains modèles génératifs peuvent produire des informations fausses mais formulées de manière convaincante.

### L'impact environnemental

Les infrastructures de calcul consomment de l'énergie et mobilisent des ressources matérielles.

**La puissance d'une technologie ne dispense jamais de mesurer sa fiabilité.**

---

## 18. Pourquoi peut-on parler de révolution ?

Une amélioration technique permet de faire mieux quelque chose que nous savions déjà faire.

Une révolution technologique transforme les possibilités, les usages et parfois l'organisation de la société.

Le transistor, le microprocesseur, l'ordinateur personnel, Internet et le smartphone ont chacun transformé notre rapport à l'informatique.

L'apprentissage automatique moderne s'inscrit dans cette histoire.

Il permet d'automatiser certaines tâches perceptives, linguistiques et analytiques qui résistaient auparavant à la programmation explicite.

L'IA générative ajoute une dimension nouvelle.

La machine peut produire du texte, du code, des images ou d'autres contenus en réponse à des instructions exprimées naturellement.

Cela abaisse certaines barrières techniques.

Une personne qui ne connaît aucun langage informatique peut demander une analyse, obtenir une explication ou prototyper une idée.

Cela ne signifie pas qu'elle possède automatiquement les compétences nécessaires pour vérifier les résultats.

Mais le rapport entre l'humain et l'ordinateur change.

### Une comparaison avec Internet

Internet a profondément transformé l'accès et la circulation de l'information.

L'IA générative transforme certaines manières d'interagir avec cette information, de la synthétiser et de produire de nouveaux contenus.

Mais une différence importante existe.

Internet donne accès à des ressources que l'on peut consulter et vérifier.

Un modèle génératif produit une réponse calculée à partir de son fonctionnement et de son contexte.

Cette réponse peut être correcte, approximative ou fausse.

Il est donc essentiel de conserver un esprit critique.

---

## 19. Le développeur de demain

Certaines tâches répétitives seront davantage automatisées.

La génération de code standard, la rédaction de tests simples, la documentation et certaines opérations de maintenance peuvent devenir plus rapides.

En revanche, plusieurs responsabilités restent essentielles :

- Comprendre les besoins métier.
- Concevoir des architectures robustes.
- Sécuriser les applications.
- Garantir la cohérence des données.
- Diagnostiquer les incidents complexes.
- Vérifier les résultats.
- Maintenir les systèmes en production.

Un système peut générer une requête SQL.

Mais qui vérifie qu'elle respecte les règles métier ?

Il peut proposer une architecture distribuée.

Mais qui détermine si cette complexité est justifiée ?

Il peut générer une API.

Mais qui garantit sa sécurité et sa maintenabilité ?

**Savoir produire du code n'est pas la même chose que savoir construire un logiciel fiable.**

Cette différence existait avant l'IA.

L'IA la rend plus visible.

---

## 20. Faut-il utiliser l'IA partout ?

Non.

Imaginons que nous souhaitions calculer le chiffre d'affaires annuel d'une entreprise.

Nous disposons de toutes les transactions dans PostgreSQL.

Une requête SQL est adaptée.

Elle produit un résultat exact selon les données et les règles définies.

Faire intervenir un modèle de langage pour calculer directement ce montant serait généralement inutile, plus coûteux et potentiellement moins fiable.

En revanche, si nous souhaitons permettre à un utilisateur de demander :

**Pourquoi notre chiffre d'affaires a-t-il diminué au troisième trimestre ?**

Un modèle de langage peut aider à interpréter la question, identifier des analyses pertinentes et formuler une explication.

Mais les chiffres doivent provenir de calculs fiables sur les données réelles.

Le modèle intervient alors dans l'interprétation et la présentation, pas comme source d'autorité sur les montants.

C'est l'une des architectures les plus intéressantes pour les applications modernes.

Des composants classiques garantissent les opérations exactes.

Les modèles d'IA apportent des capacités de compréhension et de traitement de données complexes.

---

## 21. Les agents d'intelligence artificielle

Une nouvelle étape se développe : les agents d'IA.

Un assistant conversationnel répond principalement à une demande.

Un agent peut aller plus loin en organisant plusieurs opérations pour atteindre un objectif.

### Exemple

Nous demandons à un agent :

**Analyse ce dépôt de code, repère une anomalie, propose une correction et exécute les tests.**

Pour accomplir cette tâche, il peut :

1. Examiner les fichiers.
2. Identifier les composants concernés.
3. Analyser les erreurs.
4. Proposer une modification.
5. Utiliser des outils de développement.
6. Exécuter les tests.
7. Présenter les résultats.

L'agent peut adapter ses actions en fonction des résultats obtenus.

Mais il ne devient pas infaillible.

Plus un agent dispose de capacités d'action, plus il faut prévoir des contrôles :

- Permissions limitées.
- Validation des opérations sensibles.
- Journalisation.
- Possibilité d'interrompre son exécution.
- Vérification des résultats.

Nous passons progressivement de systèmes qui répondent à des questions à des systèmes capables d'accomplir certaines tâches.

---

## 22. Conclusion : une nouvelle étape de l'histoire informatique

Pendant des décennies, nous avons appris aux ordinateurs à exécuter nos instructions.

Aujourd'hui, nous apprenons aussi aux ordinateurs à construire certains comportements à partir de l'expérience.

Mais il ne faut pas raconter cette histoire comme le remplacement d'une ancienne informatique par une nouvelle.

La programmation traditionnelle reste le socle.

Sans algorithmes, sans langages, sans systèmes d'exploitation, sans réseaux, sans bases de données et sans ingénierie logicielle, l'apprentissage automatique moderne n'existerait pas.

L'informatique a d'abord permis d'automatiser des calculs.

Puis elle a permis d'automatiser des processus.

Ensuite, elle a connecté les individus, les entreprises et les connaissances.

Aujourd'hui, elle permet d'automatiser certaines opérations de reconnaissance, de prédiction, de génération et d'aide à la décision.

Ces capacités nouvelles reposent sur plusieurs générations de découvertes scientifiques.

Et l'histoire n'est pas terminée.

Nous ne savons pas encore précisément jusqu'où ces technologies progresseront, quelles limites persisteront ni comment les métiers évolueront à long terme.

En revanche, une chose est déjà claire :

**La compétence du développeur ne se résumera pas à savoir écrire des instructions. Elle inclura de plus en plus la capacité à choisir, intégrer, évaluer et contrôler des systèmes dont une partie du comportement a été apprise.**

L'avenir du développement logiciel ne sera probablement ni entièrement traditionnel, ni entièrement fondé sur l'IA.

Il sera fait de leur complémentarité.

C'est cette complémentarité qui mérite d'être comprise en profondeur.
