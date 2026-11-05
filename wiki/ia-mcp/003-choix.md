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

Des solutions peuvent être documentées et réutilisées dans des contextes