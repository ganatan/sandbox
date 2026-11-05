# Ganatan.com — Nouvelle vision du projet

## 1. Introduction

Ganatan.com entre dans une nouvelle étape.

Le site ne sera plus une collection de tutoriels indépendants consacrés principalement à Angular.

L'objectif est désormais de construire une application web complète, simple, efficace et professionnelle.

Cette application servira également de support à sa propre documentation.

**Le site est le projet. Le projet est le tutoriel. Le livre en est la synthèse.**

Le visiteur pourra découvrir une application réelle, comprendre son architecture, suivre sa construction et apprendre comment la déployer en production.

## 2. La philosophie

Le projet repose sur quelques principes fondamentaux :

- Une seule application.
- Une seule stack technique.
- Des choix technologiques assumés.
- Une architecture simple et professionnelle.
- Des données réelles et compréhensibles.
- Une documentation complète et progressive.
- Une utilisation concrète de ChatGPT.
- Un déploiement réel sur Internet.
- Un seul produit commercial : un livre de synthèse à 10 €.

Le projet ne cherche pas à comparer toutes les technologies disponibles.

Il ne cherche pas non plus à démontrer qu'une technologie est supérieure à une autre.

Les outils sont choisis volontairement et arbitrairement.

L'objectif est de montrer comment construire une application complète avec ces outils.

## 3. Les technologies retenues

| Technologie | Utilisation |
|---|---|
| ChatGPT | Assistance à la conception, au développement et à la documentation |
| TypeScript | Langage principal |
| Angular | Application frontend |
| Node.js | Environnement d'exécution backend |
| Express | API REST |
| PostgreSQL | Base de données relationnelle |
| DigitalOcean | Hébergement et déploiement |

### Architecture générale

```text
                    ChatGPT
                       |
              Assistance au projet
                       |
                       v
                 ganatan.com
                       |
                       v
                Angular + TypeScript
                       |
                       | HTTP / REST
                       v
             Node.js + Express
                       |
                       v
                  PostgreSQL
                       |
                       v
                  DigitalOcean
```

ChatGPT intervient comme outil d'assistance.

Il ne remplace pas les technologies traditionnelles.

Le développeur conserve la responsabilité de l'architecture, de la sécurité, des tests et de la qualité du logiciel.

## 4. Une application simple

L'application repose sur quatre entités principales :

1. Country
2. City
3. Person
4. Media

Ces quatre entités permettent d'illustrer une grande partie des concepts fondamentaux du développement web.

### Country

L'entité Country représente un pays.

Exemples :

- France
- États-Unis
- Royaume-Uni
- Nouvelle-Zélande
- Australie

Elle permet d'expliquer les opérations CRUD, la validation des données et les requêtes SQL simples.

### City

L'entité City représente une ville.

Exemples :

- Paris
- Londres
- New York
- Los Angeles
- Wellington

Chaque ville peut être associée à un pays.

Cette entité permet d'introduire les relations entre tables et les clés étrangères.

### Person

L'entité Person représente une personne.

Exemples :

- Peter Jackson
- George Lucas
- Steven Spielberg
- Zack Snyder
- Christopher Nolan
- Robert Downey Jr.
- Henry Cavill

Elle permet de présenter les réalisateurs, les acteurs et d'autres personnalités du cinéma.

Elle permet également d'expliquer les relations entre personnes, villes et pays.

### Media

L'entité Media représente une œuvre audiovisuelle.

Exemples :

- Film
- Série télévisée
- Mini-série

Elle constitue l'entité principale pour illustrer les fonctionnalités les plus avancées de l'application.

## 5. Les univers cinématographiques

Les données de démonstration proviennent principalement de quatre grands ensembles cinématographiques.

### Le Seigneur des anneaux

Exemples :

- La Communauté de l'anneau (2001)
- Les Deux Tours (2002)
- Le Retour du roi (2003)
- Le Hobbit : Un voyage inattendu (2012)
- Le Hobbit : La Désolation de Smaug (2013)
- Le Hobbit : La Bataille des Cinq Armées (2014)

Ces films permettent notamment d'illustrer les relations entre œuvres, réalisateurs et acteurs.

### Star Wars

Exemples :

- Un nouvel espoir (1977)
- L'Empire contre-attaque (1980)
- Le Retour du Jedi (1983)
- La Menace fantôme (1999)
- L'Attaque des clones (2002)
- La Revanche des Sith (2005)
- Le Réveil de la Force (2015)
- Les Derniers Jedi (2017)
- L'Ascension de Skywalker (2019)
- Rogue One (2016)

Star Wars permet d'illustrer une franchise composée de plusieurs œuvres, périodes et réalisateurs.

### Marvel Cinematic Universe (MCU)

Exemples :

- Iron Man (2008)
- The Avengers (2012)
- Captain America: The Winter Soldier (2014)
- Guardians of the Galaxy (2014)
- Avengers: Infinity War (2018)
- Avengers: Endgame (2019)

Le MCU permet d'exploiter un ensemble important d'œuvres et de personnes liées entre elles.

### L'univers de Zack Snyder

Exemples :

- Man of Steel (2013)
- Batman v Superman: Dawn of Justice (2016)
- Zack Snyder's Justice League (2021)

Cet ensemble permet d'illustrer une sélection d'œuvres associées à une vision artistique et à un réalisateur.

Il peut également servir à expliquer la différence entre une franchise, un univers cinématographique et une filmographie.

## 6. Les relations entre les entités

Une première architecture relationnelle peut être construite autour des associations suivantes :

```text
Country
   |
   | 1:N
   v
 City
   |
   | 1:N
   v
 Person
   |
   | N:N
   v
 Media
```

Une ville appartient à un pays.

Une personne peut être associée à une ville.

Une personne peut participer à plusieurs médias.

Un média peut être associé à plusieurs personnes.

La relation entre Person et Media nécessite une table d'association dans PostgreSQL.

Cette architecture constitue une base pédagogique, qui pourra évoluer selon les besoins réels.

## 7. Les fonctionnalités de l'application

L'application doit rester volontairement simple.

### Fonctionnalités fondamentales

- Afficher une liste de pays.
- Consulter le détail d'un pays.
- Créer, modifier et supprimer un pays.
- Afficher les villes d'un pays.
- Consulter les personnes.
- Afficher les médias.
- Rechercher un média.
- Filtrer les médias.
- Trier les résultats.
- Consulter la fiche détaillée d'un média.
- Afficher les personnes associées à un média.

### Fonctionnalités techniques

L'application servira à expliquer :

- Les composants Angular.
- Le routage.
- Les services.
- Les formulaires.
- Les appels HTTP.
- Les API REST.
- Les opérations CRUD.
- Les validations.
- Les relations PostgreSQL.
- Les requêtes SQL.
- La pagination.
- La gestion des erreurs.
- Les tests.
- La sécurité.
- Le déploiement.

Chaque fonctionnalité doit répondre à un véritable objectif pédagogique.

L'application ne doit pas devenir inutilement complexe.

## 8. Une documentation construite autour de l'application

La documentation ne sera plus une collection de tutoriels indépendants.

Elle suivra la construction de l'application.

### Première partie : comprendre

- Histoire du développement web.
- Programmation traditionnelle.
- Apprentissage automatique.
- Intelligence artificielle.
- Architecture client-serveur.
- Fonctionnement d'Internet.
- HTTP et HTTPS.
- API REST.
- Bases de données relationnelles.

### Deuxième partie : préparer

- Choix des technologies.
- Installation des outils.
- Organisation du projet.
- Configuration des environnements.
- Utilisation de Git.
- Utilisation de ChatGPT.

### Troisième partie : développer le frontend

- Création de l'application Angular.
- Organisation des composants.
- Routage.
- Services.
- Formulaires.
- Communication avec le backend.
- Présentation des données.

### Quatrième partie : développer le backend

- Création du serveur Node.js.
- Installation d'Express.
- Organisation des routes.
- Contrôleurs.
- Services.
- Validation des données.
- Gestion des erreurs.
- Construction des API REST.

### Cinquième partie : PostgreSQL

- Installation.
- Création de la base.
- Création des tables.
- Clés primaires.
- Clés étrangères.
- Relations entre les entités.
- Requêtes SQL.
- Jointures.
- Index.
- Transactions.

### Sixième partie : qualité et sécurité

- Tests unitaires.
- Tests d'intégration.
- Validation.
- Gestion des erreurs.
- Sécurité des API.
- Variables d'environnement.
- Journalisation.
- Maintenance.

### Septième partie : déploiement

- Présentation de DigitalOcean.
- Création du serveur.
- Installation de Node.js.
- Installation de PostgreSQL.
- Configuration de Nginx.
- Configuration du domaine.
- Certificats Let's Encrypt.
- Déploiement du frontend.
- Déploiement du backend.
- Mise en production.

### Huitième partie : ChatGPT et l'intelligence artificielle

- Comprendre les modèles de langage.
- Utiliser ChatGPT comme assistant.
- Préparer une architecture.
- Générer du code.
- Comprendre les erreurs.
- Écrire des tests.
- Produire de la documentation.
- Vérifier les résultats.
- Comprendre les limites de l'IA.

## 9. L'organisation du site

Le site doit être simple et lisible.

Quatre espaces principaux suffisent.

| Rubrique | Objectif |
|---|---|
| Accueil | Présenter le projet |
| Application | Utiliser l'application réelle |
| Documentation | Comprendre sa construction |
| Livre | Acheter la synthèse |

La navigation doit rester claire.

Le visiteur doit comprendre immédiatement ce que propose ganatan.com.

## 10. Le livre de synthèse

Le livre constitue la seule proposition commerciale du site.

**Prix envisagé : 10 €.**

Il rassemble les connaissances essentielles nécessaires pour comprendre et reproduire l'application.

Il ne doit pas simplement recopier les pages de documentation.

Il doit proposer :

- Une progression pédagogique cohérente.
- Une vision globale du projet.
- Les concepts fondamentaux.
- Les choix d'architecture.
- Les étapes de réalisation.
- Les difficultés rencontrées.
- Les solutions retenues.
- Une synthèse des connaissances acquises.

La documentation en ligne reste librement consultable.

Le livre apporte une présentation condensée, structurée et facile à conserver.

## 11. Ganatan.com comme vitrine professionnelle

Le site doit également démontrer les compétences de son auteur.

Il montre concrètement la capacité à :

- Concevoir une architecture.
- Développer une application Angular.
- Construire une API Node.js et Express.
- Modéliser une base PostgreSQL.
- Gérer des relations entre données.
- Tester une application.
- Sécuriser un serveur.
- Déployer en production.
- Documenter un projet.
- Utiliser l'IA avec discernement.

Le visiteur n'a pas simplement accès à des exemples de code.

Il découvre une application complète et opérationnelle.

Cela constitue également une vitrine technique pour une activité de développement freelance.

## 12. La place de l'intelligence artificielle

ChatGPT fait partie des outils retenus pour construire le projet.

Mais l'intelligence artificielle ne doit pas devenir une justification pour complexifier inutilement l'application.

Le projet doit montrer comment un développeur expérimenté peut utiliser un assistant IA pour accélérer certaines tâches tout en conservant la maîtrise du résultat.

La programmation traditionnelle reste essentielle.

Angular construit l'interface.

Node.js et Express exécutent les traitements backend.

PostgreSQL stocke les données.

DigitalOcean héberge l'application.

ChatGPT intervient pour aider à concevoir, expliquer, produire et vérifier.

Cette complémentarité constitue l'un des messages pédagogiques du site.

