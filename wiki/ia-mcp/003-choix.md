# Ganatan — Construire une application simple, comprendre les choix

## Introduction

Ganatan.com entre dans une nouvelle étape.

L'objectif n'est plus de proposer une collection de tutoriels indépendants consacrés à Angular, Node.js ou PostgreSQL.

L'objectif est de montrer comment construire une application web complète, simple, professionnelle et réellement déployée.

Cette application servira elle-même de support à sa documentation.

**Le site est le projet. Le projet est le tutoriel. Le livre en est la synthèse.**

Nous allons utiliser une application volontairement simple, organisée autour de quatre entités :

- Country
- City
- Person
- Media

Les données de démonstration seront principalement issues de quatre grands ensembles cinématographiques :

- Le Seigneur des anneaux
- Star Wars
- Marvel Cinematic Universe (MCU)
- L'univers de Zack Snyder

L'intérêt de cette démarche est de comprendre les fondements du développement logiciel sans être distrait par une complexité fonctionnelle excessive.

Nous allons expliquer les technologies, leur histoire, leurs avantages, leurs limites et les raisons de nos choix.

Notre démarche repose sur quatre grandes décisions :

1. Le langage de programmation.
2. La base de données.
3. L'architecture logicielle.
4. Le déploiement.

Le but n'est pas de choisir les meilleures technologies dans l'absolu.

Il est de choisir des technologies éprouvées, cohérentes entre elles et adaptées à notre application.

---

# 1. Premier pilier — Le langage de programmation

## 1.1. Qu'est-ce qu'un langage de programmation ?

Un langage de programmation permet à un développeur de décrire des traitements qu'un ordinateur pourra exécuter.

Il possède une syntaxe, des règles et des mécanismes permettant de représenter des données, d'effectuer des calculs, de prendre des décisions et d'organiser des programmes.

Un programme informatique peut notamment :

- Recevoir des informations.
- Effectuer des calculs.
- Comparer des valeurs.
- Prendre des décisions.
- Répéter des opérations.
- Manipuler des fichiers.
- Communiquer avec d'autres programmes.
- Enregistrer des informations.

Mais tous les langages ne fonctionnent pas de la même manière.

Ils possèdent des philosophies, des caractéristiques et des domaines d'utilisation différents.

## 1.2. Les grandes familles de langages

Il existe plusieurs façons de classer les langages de programmation.

| Famille | Exemples | Caractéristique |
|---|---|---|
| Impérative | C, Pascal | Décrit une succession d'opérations |
| Procédurale | C, Pascal | Organise le programme en procédures |
| Orientée objet | Java, C#, C++ | Organise les traitements autour d'objets |
| Fonctionnelle | Haskell, F#, Lisp | Met l'accent sur les fonctions |
| Déclarative | SQL, Prolog | Décrit principalement le résultat recherché |
| Scripting | JavaScript, Python, Ruby | Souvent utilisé pour l'automatisation et les applications |

Ces catégories ne sont pas exclusives.

Un même langage peut appartenir à plusieurs familles.

JavaScript et TypeScript permettent notamment de combiner la programmation impérative, orientée objet et fonctionnelle.

## 1.3. Langages compilés et interprétés

Une autre distinction concerne la manière dont les programmes sont exécutés.

Un programme écrit en C est généralement compilé en code machine avant son exécution.

Java est généralement compilé en bytecode, exécuté par une machine virtuelle qui peut également utiliser une compilation JIT.

Python utilise généralement un interpréteur et une représentation intermédiaire.

TypeScript est transformé en JavaScript, puis exécuté par un moteur JavaScript.

Ces différences influencent :

- Les outils de développement.
- Les performances.
- Le déploiement.
- La portabilité.
- La détection des erreurs.
- La maintenance.

Il ne faut cependant pas réduire les performances d'un langage à la seule distinction entre compilation et interprétation.

Les moteurs modernes utilisent de nombreuses optimisations.

## 1.4. Pourquoi choisir TypeScript ?

TypeScript est un langage développé initialement chez Microsoft et rendu public en 2012.

Il ajoute notamment un système de types statiques à JavaScript.

TypeScript permet de détecter certaines incohérences avant l'exécution du programme.

Il améliore également la navigation dans le code, le refactoring et l'utilisation des outils de développement.

Pour notre application, il présente un avantage majeur.

Nous pouvons utiliser le même langage côté frontend et côté backend.

Le frontend sera développé avec Angular.

Le backend sera développé avec Node.js et Express.

Les deux utiliseront TypeScript.

Cela permet de réduire le nombre de langages nécessaires au projet.

### Les avantages

- Un langage commun pour le frontend et le backend.
- Un système de types statiques.
- Une bonne intégration avec Angular.
- Un écosystème JavaScript très développé.
- Des outils de développement performants.
- Une meilleure lisibilité des structures de données.
- Une maintenance facilitée lorsque les types sont correctement définis.

### Les limites

TypeScript ne garantit pas l'absence d'erreurs.

Son système de types fonctionne principalement pendant le développement.

Une donnée reçue depuis une API peut être incorrecte malgré la présence d'une interface TypeScript.

Il reste donc nécessaire de valider les données à l'exécution.

Le typage statique ne remplace pas les tests, les validations et la gestion des erreurs.

## 1.5. Le choix Ganatan

Nous retenons TypeScript pour trois raisons principales :

1. Utiliser un langage commun dans toute l'application.
2. Faciliter la maintenance et la compréhension du code.
3. Bénéficier d'un écosystème adapté au développement web moderne.

Ce choix ne signifie pas que TypeScript est supérieur à Java, Python, Rust ou C#.

Il signifie simplement qu'il répond correctement à nos besoins.

**Un choix technologique doit être justifié par le contexte, pas par une mode.**

---

# 2. Deuxième pilier — La base de données

## 2.1. Pourquoi une base de données ?

Une application informatique manipule des informations.

Ces informations peuvent être temporaires ou persistantes.

Une variable en mémoire disparaît généralement lorsque le programme s'arrête.

Mais une application doit souvent conserver ses informations entre plusieurs exécutions.

C'est le rôle d'une base de données.

Une base de données permet notamment :

- D'enregistrer des informations.
- De les rechercher.
- De les modifier.
- De les supprimer.
- De garantir certaines contraintes.
- De gérer des accès concurrents.
- De préserver la cohérence des données.

## 2.2. Les grandes familles de bases de données

| Famille | Exemples | Utilisation typique |
|---|---|---|
| Relationnelle | PostgreSQL, MySQL, SQLite | Données structurées et relations |
| Documentaire | MongoDB | Documents flexibles |
| Clé-valeur | Redis | Cache et accès rapide par clé |
| Graphe | Neo4j | Relations fortement interconnectées |
| Colonnaire analytique | ClickHouse | Analyse de grands volumes |

Ces catégories ne sont pas totalement exclusives.

Certains systèmes proposent plusieurs modèles de données.

Il n'existe pas de base de données universellement supérieure aux autres.

Chaque solution possède ses avantages et ses contraintes.

## 2.3. Les bases de données relationnelles

Le modèle relationnel a été proposé par Edgar F. Codd en 1970.

Il repose sur une représentation mathématique des données sous forme de relations.

Dans les systèmes relationnels courants, les données sont généralement organisées en tables.

Chaque table possède des colonnes et des lignes.

Les relations entre les données peuvent être représentées grâce à des clés.

### Exemple

Une table Country contient des pays.

Une table City contient des villes.

Chaque ville possède une référence vers son pays.

Nous pouvons ainsi rechercher toutes les villes appartenant à un pays.

Cette organisation évite de répéter inutilement certaines informations.

Elle permet également d'établir des contraintes de cohérence.

## 2.4. Pourquoi choisir PostgreSQL ?

PostgreSQL est un système de gestion de bases de données relationnelles open source.

Son histoire remonte au projet POSTGRES développé à l'université de Californie à Berkeley dans les années 1980.

Il possède une longue histoire de développement et une réputation de robustesse.

PostgreSQL permet notamment :

- De créer des tables.
- De définir des clés primaires.
- De définir des clés étrangères.
- De créer des index.
- D'exécuter des requêtes SQL.
- De gérer des transactions.
- De définir des contraintes.
- De gérer plusieurs utilisateurs.
- De sauvegarder et restaurer les données.

Notre application repose sur quatre entités :

- Country
- City
- Person
- Media

Ces entités possèdent des relations naturelles.

Un pays possède plusieurs villes.

Une ville peut être associée à plusieurs personnes.

Une personne peut participer à plusieurs médias.

Un média peut être associé à plusieurs personnes.

PostgreSQL est particulièrement adapté à cette organisation.

## 2.5. La cohérence des données

Prenons un exemple.

Nous possédons un pays appelé France.

Plusieurs villes sont associées à ce pays.

Que doit-il se passer si nous supprimons la France ?

Plusieurs comportements sont possibles.

Nous pouvons refuser la suppression.

Nous pouvons supprimer les villes associées.

Nous pouvons également prévoir une autre politique métier.

Mais cette décision doit être explicite.

PostgreSQL permet de faire respecter certaines règles directement dans la base de données.

Il ne s'agit donc pas seulement de stocker des informations.

Il s'agit également d'en préserver la cohérence.

## 2.6. Le choix Ganatan

Nous utiliserons PostgreSQL.

Nous privilégierons une modélisation relationnelle simple et compréhensible.

Nous éviterons d'ajouter inutilement :

- Un moteur de recherche externe.
- Une base documentaire supplémentaire.
- Un système de cache.
- Une infrastructure de réplication complexe.
- Un ORM imposant de nombreuses abstractions.

Ces technologies pourront être étudiées si un besoin réel apparaît.

Pour commencer, PostgreSQL et des requêtes SQL bien structurées suffisent.

**La simplicité ne signifie pas l'absence de structure. Elle signifie que chaque élément doit avoir une utilité identifiable.**

---

# 3. Troisième pilier — L'architecture logicielle

## 3.1. Pourquoi l'architecture est-elle importante ?

Un développeur peut maîtriser parfaitement un langage et produire malgré tout un logiciel difficile à maintenir.

Connaître TypeScript, Angular et PostgreSQL ne suffit pas.

Il faut savoir organiser les responsabilités.

Une application peut fonctionner aujourd'hui tout en devenant très difficile à modifier demain.

C'est précisément l'un des problèmes que l'architecture logicielle cherche à résoudre.

## 3.2. Qu'est-ce qu'une architecture logicielle ?

L'architecture logicielle définit les grandes structures d'un système, ses composants, leurs responsabilités et leurs interactions.

Elle répond à plusieurs questions :

- Qui reçoit les requêtes ?
- Qui applique les règles métier ?
- Qui accède aux données ?
- Qui construit l'interface ?
- Comment les composants communiquent-ils ?
- Quelles parties peuvent évoluer indépendamment ?
- Comment limiter les dépendances inutiles ?

Une architecture doit rendre ces responsabilités compréhensibles.

Elle doit également permettre au logiciel d'évoluer sans provoquer des modifications incontrôlées.

## 3.3. Trois architectures à connaître

Pour Ganatan, nous allons présenter trois grandes approches :

1. L'architecture en couches.
2. L'architecture hexagonale.
3. L'architecture microservices.

Ces approches ne se situent pas exactement au même niveau et ne sont pas toujours mutuellement exclusives.

Elles permettent néanmoins d'expliquer différents principes d'organisation.

## 3.4. Architecture en couches

L'architecture en couches organise le logiciel selon plusieurs niveaux de responsabilité.

Une organisation classique distingue :

- La présentation.
- La logique métier.
- L'accès aux données.
- La persistance.

### Représentation

```text
Présentation / API
        |
        v
  Logique métier
        |
        v
 Accès aux données
        |
        v
    PostgreSQL
```

Chaque couche possède un rôle identifiable.

La présentation reçoit les demandes.

La logique métier applique les règles de l'application.

L'accès aux données exécute les opérations nécessaires sur la base.

La base de données conserve les informations.

### Les avantages

- Organisation facile à comprendre.
- Responsabilités clairement séparées.
- Maintenance relativement simple.
- Tests plus faciles à organiser.
- Architecture adaptée aux applications CRUD.

### Les limites

Une architecture en couches peut devenir trop rigide si elle est appliquée mécaniquement.

Il faut également éviter de multiplier les couches sans nécessité.

Pour notre application, cette approche constitue un excellent point de départ.

## 3.5. Architecture hexagonale

L'architecture hexagonale est associée aux travaux d'Alistair Cockburn au milieu des années 2000.

Elle est également connue sous le nom de Ports and Adapters.

Son objectif principal est d'isoler le cœur métier des technologies externes.

Dans cette approche, le domaine métier ne doit pas dépendre directement des détails techniques de l'infrastructure.

Les interactions passent par des ports et des adaptateurs.

### Principe

```text
        Interface HTTP
              |
              v
           Adaptateur
              |
              v
        Port applicatif
              |
              v
         Domaine métier
              |
              v
        Port de sortie
              |
              v
      Adaptateur PostgreSQL
```

Cette représentation est volontairement simplifiée.

Le principe essentiel est que le cœur métier reste indépendant des mécanismes techniques utilisés pour communiquer avec l'extérieur.

### Les avantages

- Meilleure isolation du domaine métier.
- Dépendances plus faciles à contrôler.
- Infrastructure potentiellement remplaçable.
- Tests du domaine facilités.
- Architecture intéressante pour les systèmes métier complexes.

### Les limites

Cette approche peut nécessiter davantage d'interfaces, d'abstractions et de composants.

Elle peut être très pertinente dans une application comportant une logique métier importante.

Mais elle n'est pas nécessairement adaptée à tous les projets.

### Le cas Ganatan

Notre application contient quatre entités relativement simples.

Nous n'avons pas besoin d'une architecture hexagonale complète pour afficher une liste de pays ou enregistrer un film.

Nous pouvons cependant retenir certaines de ses idées.

Par exemple, éviter que la logique métier dépende directement de détails techniques inutiles.

**Nous pouvons apprendre d'une architecture sans être obligés de l'appliquer intégralement.**

## 3.6. Architecture microservices

L'architecture microservices consiste à organiser une application autour de plusieurs services relativement autonomes.

Chaque service peut posséder ses propres responsabilités et son propre cycle de déploiement.

Par exemple :

```text
             Frontend Angular
                    |
                    v
               API Gateway
                    |
       +------------+------------+
       |            |            |
       v            v            v
 Country Service  Person Service  Media Service
       |            |            |
       v            v            v
    Database     Database     Database
```

Il s'agit d'une représentation possible, et non d'une obligation universelle.

### Les avantages

- Déploiements indépendants.
- Autonomie possible des équipes.
- Montée en charge différenciée.
- Découpage de domaines importants.
- Isolation de certains composants.

### Les limites

- Communications réseau supplémentaires.
- Gestion des erreurs distribuées.
- Supervision plus complexe.
- Gestion des transactions plus difficile.
- Déploiements multiples.
- Coûts opérationnels supplémentaires.

### Le cas Ganatan

Construire quatre microservices pour quatre entités CRUD serait disproportionné.

Nous ajouterions beaucoup de complexité sans bénéfice réel.

Nous n'utiliserons donc pas cette architecture.

## 3.7. Le choix Ganatan : un monolithe modulaire en couches

Nous retiendrons une architecture client-serveur.

Le frontend sera développé avec Angular.

Le backend sera développé avec Node.js et Express.

Le backend sera organisé en modules fonctionnels.

Chaque module correspondra à une entité ou à un ensemble cohérent de responsabilités.

### Architecture générale

```text
                 Angular
                    |
                    | HTTP / JSON
                    v
             Node.js / Express
                    |
       +------------+------------+
       |            |            |
       v            v            v
     Routes      Services    Repositories
                    |
                    v
                PostgreSQL
```

Une représentation plus précise des modules backend :

```text
Backend
|
+-- Country
|   +-- Routes
|   +-- Service
|   +-- Repository
|
+-- City
|   +-- Routes
|   +-- Service
|   +-- Repository
|
+-- Person
|   +-- Routes
|   +-- Service
|   +-- Repository
|
+-- Media
    +-- Routes
    +-- Service
    +-- Repository
```

Cette structure est indicative.

Nous éviterons de créer des couches ou des fichiers qui ne remplissent aucune responsabilité réelle.

### Pourquoi un monolithe ?

Un monolithe n'est pas nécessairement un logiciel mal organisé.

Il désigne principalement une application dont plusieurs fonctionnalités sont regroupées dans une même unité de déploiement.

Un monolithe correctement structuré peut être robuste, maintenable et professionnel.

Pour notre application, il constitue une solution adaptée.

---

# 4. Les design patterns — Histoire et principes

## 4.1. Qu'est-ce qu'un design pattern ?

Un design pattern est une solution de conception réutilisable à un problème récurrent dans un contexte donné.

En français, nous utilisons principalement l'expression **patron de conception**.

Un patron de conception n'est pas une bibliothèque.

Ce n'est pas non plus un morceau de code que nous devons recopier systématiquement.

C'est une manière reconnue d'organiser certaines responsabilités ou interactions.

Il décrit généralement :

- Un problème.
- Un contexte.
- Une solution.
- Des conséquences.
- Des avantages.
- Des compromis.

L'objectif est d'éviter de réinventer inutilement des solutions déjà étudiées.

## 4.2. Les origines : Christopher Alexander

L'idée de formaliser des solutions récurrentes ne vient pas directement de l'informatique.

Elle a notamment été développée dans le domaine de l'architecture des bâtiments.

En 1977, Christopher Alexander et ses collaborateurs publient l'ouvrage *A Pattern Language*.

Ils y présentent des solutions récurrentes à des problèmes d'architecture et d'urbanisme.

L'idée est simple.

Certains problèmes reviennent régulièrement.

Des solutions peuvent être documentées et réutilisées dans des contextes similaires.

Cette approche influencera ensuite l'ingénierie logicielle.

## 4.3. L'arrivée des design patterns dans le logiciel

Dans les années 1980 et 1990, les développeurs orientés objet cherchent à formaliser des solutions de conception récurrentes.

Les applications deviennent plus complexes.

Les classes et les objets doivent communiquer.

Les développeurs rencontrent régulièrement les mêmes difficultés :

- Comment créer des objets ?
- Comment organiser les dépendances ?
- Comment faire communiquer des composants ?
- Comment remplacer un comportement ?
- Comment éviter une duplication excessive ?
- Comment faire évoluer une application ?

Les design patterns proposent un vocabulaire et des solutions de référence.

## 4.4. Le Gang of Four

En 1994 paraît l'ouvrage :

*Design Patterns: Elements of Reusable Object-Oriented Software.*

Il est publié par quatre auteurs :

- Erich Gamma.
- Richard Helm.
- Ralph Johnson.
- John Vlissides.

Ces auteurs sont connus sous le nom de **Gang of Four**, souvent abrégé en GoF.

L'ouvrage est fréquemment associé à l'année 1995 en raison de sa diffusion et de son influence à cette époque.

Il recense 23 patrons de conception orientés objet.

Ces patrons sont répartis en trois grandes familles.

## 4.5. Première famille : les patterns de création

Les patterns de création organisent la manière dont les objets sont construits.

Ils cherchent notamment à éviter que le code dépende inutilement de mécanismes de création trop spécifiques.

Les cinq patterns sont :

1. Abstract Factory.
2. Builder.
3. Factory Method.
4. Prototype.
5. Singleton.

### Exemple : Builder

Le pattern Builder permet de construire progressivement des objets complexes.

Il peut être utile lorsque la création d'un objet nécessite plusieurs étapes ou de nombreux paramètres.

Mais il serait inutile de créer un Builder pour un objet contenant seulement un identifiant et un nom.

## 4.6. Deuxième famille : les patterns de structure

Les patterns de structure organisent la composition des classes et des objets.

Ils permettent notamment de combiner plusieurs composants tout en contrôlant leurs dépendances.

Les sept patterns sont :

1. Adapter.
2. Bridge.
3. Composite.
4. Decorator.
5. Facade.
6. Flyweight.
7. Proxy.

### Exemple : Adapter

Le pattern Adapter permet de faire communiquer des composants dont les interfaces ne sont pas directement compatibles.

Il peut être utile lorsqu'une application doit utiliser un système externe possédant une interface différente de celle attendue.

## 4.7. Troisième famille : les patterns de comportement

Les patterns de comportement organisent les interactions et la répartition des responsabilités.

Les onze patterns sont :

1. Chain of Responsibility.
2. Command.
3. Interpreter.
4. Iterator.
5. Mediator.
6. Memento.
7. Observer.
8. State.
9. Strategy.
10. Template Method.
11. Visitor.

### Exemple : Strategy

Le pattern Strategy permet de définir plusieurs algorithmes interchangeables.

Le programme peut sélectionner un comportement sans modifier le composant qui l'utilise.

Cela peut être utile lorsqu'une application doit proposer plusieurs méthodes de calcul ou plusieurs politiques métier.

## 4.8. Pourquoi les design patterns sont-ils importants ?

Ils présentent plusieurs avantages.

### Réutiliser des solutions éprouvées

Les développeurs rencontrent régulièrement des problèmes similaires.

Les patterns permettent de s'appuyer sur des solutions déjà étudiées.

### Limiter le couplage

Le couplage représente le niveau de dépendance entre plusieurs composants.

Un couplage excessif peut rendre les modifications difficiles.

Certains patterns permettent de mieux contrôler ces dépendances.

Mais l'ajout d'interfaces ou d'abstractions ne réduit pas automatiquement le couplage.

Une abstraction inutile peut elle-même créer de la complexité.

### Favoriser la maintenance

Une bonne séparation des responsabilités facilite la compréhension et l'évolution du logiciel.

### Créer un vocabulaire commun

Les patterns permettent aux développeurs de communiquer plus efficacement.

Par exemple, dire « nous allons utiliser Strategy » permet de désigner une intention de conception connue.

Il n'est pas nécessaire de réexpliquer entièrement le principe à chaque discussion.

## 4.9. Les limites des design patterns

Les design patterns ne constituent pas une liste obligatoire.

Il ne faut pas chercher à utiliser les 23 patterns dans chaque application.

Un pattern peut être utile dans un contexte et inutile dans un autre.

Il peut également devenir nuisible lorsqu'il introduit trop d'abstractions.

Le nombre de patterns utilisés ne mesure pas la qualité d'un logiciel.

**La bonne conception consiste à résoudre les problèmes réels avec le niveau de complexité nécessaire.**

---

# 5. Design pattern et architecture pattern

## 5.1. Les traductions

| Anglais | Français |
|---|---|
| Design Pattern | Patron de conception |
| Architecture Pattern | Patron d'architecture |
| Software Architecture | Architecture logicielle |
| Design Principles | Principes de conception |
| Technical Debt | Dette technique |
| Loose Coupling | Couplage faible |
| Separation of Concerns | Séparation des responsabilités |

Nous rencontrons parfois les expressions :

- Modèle de conception.
- Modèle d'architecture.
- Patron de conception.
- Patron d'architecture.

Dans ce contexte, les termes « patron de conception » et « patron d'architecture » sont particulièrement précis.

## 5.2. Quelle différence ?

Un patron de conception répond généralement à un problème local de conception logicielle.

Un patron d'architecture décrit une organisation plus globale du système.

Par exemple :

- Strategy est un patron de conception.
- Observer est un patron de conception.
- Factory Method est un patron de conception.
- L'architecture en couches est un patron d'architecture.
- L'architecture microservices est un style architectural.
- L'architecture hexagonale est une approche architecturale.

Ces notions peuvent être combinées.

Une application organisée en couches peut utiliser Strategy dans un service.

Un système hexagonal peut utiliser Adapter pour communiquer avec une infrastructure externe.

Les différents niveaux de conception ne sont donc pas incompatibles.

---

# 6. Les principes de conception retenus pour Ganatan

Nous n'allons pas implémenter artificiellement les 23 patterns GoF.

Nous allons présenter leur histoire et leurs principes.

Puis nous utiliserons uniquement les mécanismes nécessaires à notre application.

| Concept | Utilisation |
|---|---|
| Separation of Concerns | Séparer API, logique métier et accès aux données |
| Dependency Injection | Gérer certaines dépendances, notamment dans Angular |
| Repository | Centraliser les accès PostgreSQL |
| DTO | Définir les structures échangées avec l'API |
| Middleware | Gérer les traitements HTTP transversaux |
| Strategy | Présenter si plusieurs algorithmes interchangeables apparaissent |

Il faut préciser que Repository, DTO et Middleware ne font pas partie des 23 patterns GoF.

Ils appartiennent à d'autres familles de pratiques et de patrons logiciels.

Cette distinction est importante.

Nous ne devons pas mélanger les concepts simplement parce qu'ils portent tous des noms techniques.

---

# 7. La dette technique

## 7.1. Qu'est-ce que la dette technique ?

La notion de dette technique est associée à Ward Cunningham, qui popularise cette métaphore en 1992.

Elle décrit les coûts futurs que peuvent engendrer certains choix techniques.

Un développeur peut choisir une solution rapide pour répondre à un besoin immédiat.

Cette solution peut fonctionner parfaitement aujourd'hui.

Mais elle peut rendre les évolutions futures plus difficiles.

La dette technique représente alors le coût supplémentaire que nous risquons de payer plus tard.

## 7.2. Exemple

Imaginons que nous développons une API.

Pour aller rapidement, nous écrivons toutes les opérations directement dans les routes Express.

Au début, l'application est petite.

Le code reste compréhensible.

Mais progressivement, nous ajoutons :

- Des validations.
- Des règles métier.
- Des contrôles d'accès.
- Des traitements complexes.
- Des appels à la base de données.

Les routes deviennent longues et difficiles à maintenir.

Une meilleure séparation des responsabilités pourrait alors devenir nécessaire.

## 7.3. La surarchitecture est aussi un risque

Il existe cependant un problème inverse.

Imaginons que nous créons :

- Quarante interfaces.
- Quinze couches d'abstraction.
- Plusieurs services indépendants.
- Une infrastructure de messagerie.
- Un système distribué.

Tout cela pour afficher une liste de pays.

Nous avons créé une complexité qui n'apporte pas de bénéfice évident.

Cette complexité augmente également les coûts de maintenance.

La dette technique ne provient donc pas uniquement d'un manque d'architecture.

Elle peut également résulter d'une architecture disproportionnée.

## 7.4. Le principe Ganatan

Nous devons construire une application suffisamment structurée pour rester maintenable.

Mais nous devons refuser les abstractions qui ne répondent à aucun besoin réel.

**La bonne architecture n'est pas celle qui utilise le plus de patterns. C'est celle qui répond aux besoins présents tout en permettant des évolutions raisonnables.**

---

# 8. Quatrième pilier — Le déploiement

## 8.1. Qu'est-ce que le déploiement ?

Une application qui fonctionne sur le poste d'un développeur n'est pas nécessairement disponible pour ses utilisateurs.

Le déploiement consiste à installer, configurer et exécuter le logiciel dans un environnement accessible.

Il faut notamment :

- Préparer un serveur.
- Installer les logiciels nécessaires.
- Configurer les services.
- Transférer l'application.
- Démarrer les processus.
- Configurer le réseau.
- Sécuriser les communications.
- Surveiller le fonctionnement.

Le déploiement constitue une étape essentielle du cycle de vie d'un logiciel.

## 8.2. Les différentes solutions

Il existe plusieurs manières de déployer une application.

Nous pouvons utiliser :

- Un hébergement mutualisé.
- Un serveur privé virtuel.
- Une plateforme applicative managée.
- Des conteneurs.
- Une infrastructure cloud.
- Une architecture serverless.

Chaque solution possède ses avantages et ses limites.

Certaines simplifient l'exploitation.

D'autres donnent davantage de contrôle au développeur.

## 8.3. Pourquoi choisir DigitalOcean ?

DigitalOcean est un fournisseur de services cloud.

Il permet notamment de créer des serveurs virtuels Linux appelés Droplets.

Pour Ganatan, nous utiliserons un serveur Linux sur DigitalOcean.

Ce choix présente un intérêt pédagogique important.

Il permet de comprendre toute la chaîne de déploiement.

Nous pouvons installer et configurer directement :

- Node.js.
- PostgreSQL.
- Nginx.
- Les services système.
- Les certificats HTTPS.
- Les paramètres réseau.

Nous voyons ainsi ce qui se passe réellement sur le serveur.

## 8.4. Architecture de production

```text
              Utilisateur
                   |
                   v
               Navigateur
                   |
                   v
               Internet
                   |
                   v
                  DNS
                   |
                   v
                 HTTPS
                   |
                   v
             DigitalOcean
                   |
                   v
                 Nginx
                   |
          +--------+--------+
          |                 |
          v                 v
        Angular         Node.js
                        Express
                           |
                           v
                       PostgreSQL
```

Nginx peut notamment servir de reverse proxy.

Il reçoit les requêtes HTTP et HTTPS et les transmet aux composants appropriés.

Le frontend Angular peut être servi sous forme de fichiers statiques ou utiliser un rendu côté serveur selon les besoins retenus.

Pour une première version pédagogique, nous privilégierons le fonctionnement le plus simple compatible avec les objectifs du site.

## 8.5. Les sujets indispensables

Le déploiement ne se limite pas au démarrage d'un processus Node.js.

Nous devons également comprendre :

- Les domaines et le DNS.
- HTTP et HTTPS.
- Les certificats TLS.
- Les ports réseau.
- Les pare-feu.
- Les accès SSH.
- Les variables d'environnement.
- Les permissions Linux.
- Les sauvegardes.
- La journalisation.
- La surveillance.
- Les mises à jour.
- La restauration après incident.

Une application accessible sur Internet doit être exploitée avec sérieux.

---

# 9. POC, MVP et application standard

## 9.1. Trois notions différentes

Nous allons construire une application simple.

Mais il est important de distinguer plusieurs concepts souvent confondus.

Le POC, le MVP et l'application de référence ne désignent pas exactement la même chose.

## 9.2. POC — Proof of Concept

En français : preuve de concept.

Un POC sert à démontrer qu'une idée ou une solution est techniquement réalisable.

Il répond principalement à la question :

**Est-ce que cela peut fonctionner ?**

### Exemple Ganatan

Nous voulons vérifier qu'une application Angular peut communiquer avec une API Express qui interroge PostgreSQL.

Nous construisons un exemple minimal.

Angular envoie une requête HTTP.

Express reçoit la requête.

PostgreSQL retourne des données.

Express renvoie une réponse JSON.

Angular affiche le résultat.

Nous avons démontré la faisabilité technique.

Le POC n'a pas nécessairement besoin d'être prêt pour de vrais utilisateurs.

## 9.3. MVP — Minimum Viable Product

En français : produit minimum viable.

Un MVP est une première version utilisable d'un produit.

Il contient suffisamment de fonctionnalités pour répondre à un besoin réel et obtenir des retours.

Il répond à une question différente :

**Est-ce que cette solution apporte réellement de la valeur à ses utilisateurs ?**

### Exemple Ganatan

Notre MVP pourrait comprendre :

- La liste des pays.
- La liste des villes.
- La liste des personnes.
- La liste des médias.
- Les fiches détaillées.
- Les opérations CRUD essentielles.
- Une recherche simple.
- Une documentation initiale.
- Un déploiement fonctionnel.

Nous n'avons pas besoin de fonctionnalités avancées pour commencer.

L'objectif est de disposer d'une première application cohérente et utilisable.

## 9.4. Application standard

L'expression « application standard » ne possède pas de définition universelle aussi précise que POC ou MVP.

Dans notre projet, elle désigne une application web représentative des pratiques courantes du développement logiciel.

Elle comprend :

- Un frontend.
- Un backend.
- Une API.
- Une base de données.
- Des validations.
- Des tests.
- Une gestion des erreurs.
- Une architecture identifiable.
- Un déploiement.

Cette application constitue notre référence pédagogique.

## 9.5. Une progression naturelle

Nous ne construisons pas trois applications différentes.

Nous faisons évoluer un seul projet.

### Étape 1 : le POC

Vérifier que les technologies fonctionnent ensemble.

### Étape 2 : le MVP

Construire une première application utilisable.

### Étape 3 : l'application de référence

Consolider les tests, la sécurité, la documentation, l'architecture et le déploiement.

Cette progression permet de maîtriser la complexité.

---

# 10. La démarche pédagogique Ganatan

## 10.1. Expliquer avant de développer

Ganatan ne doit pas simplement montrer des commandes à exécuter.

Le site doit expliquer les raisons des décisions techniques.

Avant de présenter TypeScript, nous expliquons ce qu'est un langage de programmation.

Avant de présenter PostgreSQL, nous expliquons les bases de données.

Avant de présenter une architecture en couches, nous expliquons le rôle de l'architecture logicielle.

Avant de déployer sur DigitalOcean, nous expliquons les serveurs, les réseaux et les mécanismes de déploiement.

Cette approche permet de comprendre les technologies au lieu de simplement reproduire des recettes.

## 10.2. Une progression commune

Chaque grand chapitre suivra une progression similaire :

1. Présenter le problème.
2. Expliquer les concepts fondamentaux.
3. Présenter les origines et l'histoire.
4. Décrire les grandes solutions existantes.
5. Comparer leurs avantages et leurs limites.
6. Justifier le choix Ganatan.
7. Montrer son application concrète.
8. Expliquer les difficultés rencontrées.
9. Présenter les bonnes pratiques.
10. Conclure avec une synthèse.

Cette progression doit rester accessible à un débutant tout en conservant une véritable rigueur technique.

## 10.3. Les quatre grands chapitres

| Chapitre | Question fondamentale | Choix |
|---|---|---|
| Langage | Comment programmer ? | TypeScript |
| Base de données | Comment organiser et conserver les informations ? | PostgreSQL |
| Architecture | Comment construire un logiciel maintenable ? | Client-serveur et architecture en couches |
| Déploiement | Comment rendre le logiciel accessible ? | DigitalOcean |

Angular, Node.js et Express seront étudiés comme des outils concrets intervenant dans cette architecture.

ChatGPT sera présenté comme un assistant capable d'aider à concevoir, développer, expliquer, tester et documenter.

Il ne remplacera ni les fondamentaux ni la responsabilité du développeur.

---

# 11. La simplicité comme principe directeur

La simplicité constitue le fil conducteur du projet.

Mais elle ne doit pas être confondue avec le simplisme.

Une application simple peut être correctement architecturée, testée, sécurisée et documentée.

À l'inverse, une application très complexe n'est pas nécessairement professionnelle.

Nous devons éviter plusieurs pièges.

### Ne pas multiplier les technologies

Nous utilisons une stack volontairement limitée.

### Ne pas multiplier les architectures

Nous choisissons une architecture adaptée à notre besoin.

### Ne pas multiplier les design patterns

Nous utilisons les patrons de conception lorsqu'ils répondent à un problème réel.

### Ne pas anticiper tous les besoins imaginables

Nous construisons d'abord les fonctionnalités nécessaires.

### Ne pas sacrifier la qualité

La simplicité ne justifie pas l'absence de validations, de tests ou de sécurité.

### Ne pas confondre modernité et pertinence

Une technologie récente n'est pas automatiquement préférable à une solution éprouvée.

**Aucune complexité sans justification.**

C'est probablement le principe le plus important de la démarche Ganatan.

---

# 12. Le rôle de ChatGPT

ChatGPT fait partie des outils choisis pour construire le projet.

Il intervient comme assistant de développement.

Il peut notamment aider à :

- Comprendre un concept.
- Comparer plusieurs solutions.
- Préparer une architecture.
- Produire du code.
- Expliquer une erreur.
- Proposer des tests.
- Analyser une implémentation.
- Rédiger une documentation.
- Préparer un déploiement.

Mais ChatGPT ne remplace pas les connaissances fondamentales.

Un modèle de langage peut produire une réponse incorrecte.

Il peut également proposer une architecture inutilement complexe ou un code présentant des défauts.

Le développeur doit conserver sa capacité à analyser, vérifier et décider.

Notre projet montrera comment utiliser l'intelligence artificielle en complément des méthodes traditionnelles.

---

# 13. Ganatan.com comme application et documentation

Le site présentera une application réelle.

Cette application sera également le sujet de sa documentation.

Le visiteur pourra :

- Utiliser l'application.
- Consulter les données.
- Comprendre les entités.
- Étudier les relations.
- Découvrir l'architecture.
- Comprendre les technologies.
- Suivre le développement.
- Étudier le déploiement.

Le site pourra être organisé autour de quatre espaces :

| Rubrique | Objectif |
|---|---|
| Accueil | Présenter la démarche |
| Application | Utiliser l'application |
| Documentation | Comprendre sa construction |
| Livre | Obtenir la synthèse |

L'application devient une démonstration vivante de son propre fonctionnement.

La documentation ne décrit pas un projet abstrait.

Elle explique le logiciel que le visiteur utilise réellement.

---

# 14. Le livre de synthèse

Le livre constitue la seule proposition commerciale du site.

**Prix envisagé : 10 €.**

Il doit présenter l'essentiel de la démarche dans un ouvrage structuré.

Il ne doit pas simplement recopier la documentation en ligne.

Il doit proposer :

- Une progression pédagogique.
- Une vision globale.
- Les concepts fondamentaux.
- Les choix technologiques.
- Les décisions d'architecture.
- Les étapes de construction.
- Les difficultés rencontrées.
- Les bonnes pratiques.
- Une synthèse finale.

La documentation en ligne reste accessible.

Le livre apporte une lecture plus condensée, organisée et facile à conserver.

---

# 15. Conclusion — La philosophie Ganatan

Ganatan.com ne sera plus uniquement un site de tutoriels Angular.

Il deviendra un projet pédagogique consacré à la construction d'une application web complète.

Nous partirons d'une application simple :

- Country.
- City.
- Person.
- Media.

Nous utiliserons une stack volontairement limitée :

- ChatGPT.
- TypeScript.
- Angular.
- Node.js.
- Express.
- PostgreSQL.
- DigitalOcean.

Nous expliquerons quatre décisions fondamentales :

1. Le langage.
2. La base de données.
3. L'architecture.
4. Le déploiement.

Nous présenterons les alternatives, leur histoire, leurs avantages et leurs limites.

Nous expliquerons les design patterns, les patrons d'architecture, le couplage et la dette technique.

Nous distinguerons le POC, le MVP et l'application de référence.

Nous montrerons comment construire progressivement un logiciel réel, sans multiplier les technologies et sans ajouter de complexité inutile.

L'objectif n'est pas de construire l'application la plus spectaculaire.

Il est de démontrer comment construire correctement une application simple, comprendre les décisions prises et maîtriser l'ensemble du processus.

**La promesse de Ganatan : comprendre les fondamentaux du développement logiciel en construisant une application web complète, simple et réellement déployée.**

**Une application. Une architecture. Une documentation. Un livre.**