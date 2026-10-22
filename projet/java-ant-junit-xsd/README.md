# Java 8 — Ant, JUnit 3 et classes Java générées depuis XSD

Projet pédagogique minimal pour reproduire une architecture Java industrielle : un fichier XSD, des classes générées par JAXB/XJC, un `Main` qui les utilise, un test JUnit et un `build.xml` Ant. **Sans Maven ni Gradle.**

## 1. Architecture

```text
java-ant-junit-xsd/
├── build.xml
├── README.md
├── .gitignore
├── src/
│   ├── main/
│   │   └── com/ganatan/cinema/Main.java
│   ├── generated/
│   │   ├── .gitkeep
│   │   └── com/ganatan/cinema/generated/
│   │       ├── Film.java
│   │       └── ObjectFactory.java
│   └── misc/
│       ├── film.xsd
│       └── film.xml
├── test/
│   └── com/ganatan/cinema/FilmTest.java
├── lib/
│   └── junit.jar
├── build/
│   ├── classes/
│   └── tests/
└── dist/
    ├── app.jar
    └── app-install.zip
```

Les fichiers `Film.java` et `ObjectFactory.java` **n'existent pas lors du premier clonage** : la commande `ant generate` les crée. Les dossiers `build` et `dist` sont également créés par Ant. `lib/junit.jar` doit être ajouté localement pour les tests.

| Élément | Rôle |
|---|---|
| `src/misc/film.xsd` | Définit la structure XML : `titre` (chaîne) et `annee` (entier) |
| `src/misc/film.xml` | Exemple de données XML, non lu par `Main` dans cet exemple |
| `src/generated` | Sources Java créées automatiquement à partir du XSD |
| `src/main` | Sources écrites à la main ; `Main` importe `Film` |
| `test` | Tests JUnit 3 |
| `lib` | JAR externes requis pour les tests |
| `build` | Fichiers `.class` compilés |
| `dist` | Livrables `app.jar` et `app-install.zip` |

## 2. Prérequis sous Windows

Installer et configurer :

- Un **JDK 8** contenant JAXB et `xjc`. Utiliser un JDK complet, pas un simple JRE.
- **Apache Ant**, accessible depuis le terminal.
- **JUnit 3.8.2**, placé sous `lib/junit.jar` pour exécuter les tests.
- IntelliJ IDEA pour ouvrir les sources et lancer `Main` ou `FilmTest` directement.

Vérifier dans le terminal IntelliJ ou Windows :

```bat
java -version
javac -version
xjc -version
ant -version
where java
where javac
where xjc
```

Les versions `java` et `javac` doivent correspondre au JDK 8 sélectionné. Le niveau de langage Java 8 d'IntelliJ ne suffit **pas** si la compilation utilise en réalité un JDK plus récent : `javax.xml.bind.annotation` n'y est plus fourni par défaut.

## 3. Générer la classe Film

Ouvrir le terminal à la racine du projet, là où se trouve `build.xml` :

```bat
ant generate
```

La cible `generate` exécute l'équivalent de :

```bat
xjc -encoding UTF-8 -d src/generated -p com.ganatan.cinema.generated src/misc/film.xsd
```

XJC crée `Film.java` et `ObjectFactory.java` dans :

```text
src/generated/com/ganatan/cinema/generated/
```

Dans le code Java de `Main` et du test, l'import est :

```java
import com.ganatan.cinema.generated.Film;
```

**Ne jamais éditer directement les classes générées.** IntelliJ peut afficher le message « Generated source files should not be edited » : c'est normal. Pour faire évoluer les champs, modifier `film.xsd` puis relancer la génération.

## 4. Compiler, exécuter, tester et livrer

Commandes essentielles depuis la racine du projet :

```bat
ant generate
ant compile
ant run
ant test
ant jar
```

Résultat attendu de `ant run` :

```text
Alien (1979)
```

Pour exécuter le livrable :

```bat
java -jar dist/app.jar
```

Pour exécuter toute la chaîne en une fois (**JUnit doit être présent**) :

```bat
ant all
```

| Cible Ant | Rôle |
|---|---|
| `ant generate` | Génère les fichiers Java depuis le XSD |
| `ant compile` | Génère puis compile les sources manuelles et générées |
| `ant run` | Exécute `Main` après compilation |
| `ant test` | Compile et exécute `FilmTest` avec JUnit 3 |
| `ant jar` | Produit `dist/app.jar` et `dist/app-install.zip` |
| `ant all` | Lance tests et création des livrables |
| `ant clean` | Supprime les fichiers produits par Ant, en conservant le marqueur `.gitkeep` |

Les cibles `compile`, `run`, `test` et `jar` appellent déjà `generate` via les dépendances déclarées dans `build.xml`. La suite de commandes ci-dessus permet de visualiser chaque étape séparément.

## 5. Configuration IntelliJ IDEA : méthode qui a résolu les erreurs

### A. Project SDK

Dans **File → Project Structure → Project** :

- **SDK : JDK 1.8**
- **Language level : 8**

Dans **Modules → Dependencies**, choisir **Project SDK (Java 8)** pour le module utilisé. Si `javax.xml.bind.annotation` est introuvable, vérifier d'abord le véritable SDK de compilation.

### B. Répertoires sources

Dans **File → Project Structure → Modules → Sources**, configurer au minimum :

| Chemin | Marquage |
|---|---|
| `src/main` | **Sources** |
| `src/generated` | **Sources** ou **Generated Sources Root** |
| `test` | **Tests** |
| `src/misc` | Aucun marquage nécessaire |
| `build`, `dist`, `out` | **Excluded**, de préférence |

**Configuration vérifiée pendant le dépannage :** dans la capture IntelliJ qui fonctionne, le module `java-ant-junit-xsd` indique, à droite, **Source Folders : `src`, `src\\generated`** et **Test Source Folders : `test`**. Cette configuration est celle effectivement utilisée sur le poste. Pour une nouvelle configuration, il est généralement plus clair de choisir explicitement `src/main` et `src/generated` comme racines sources, sans déclarer inutilement tout `src` comme racine supplémentaire.

Dans la vue **Project**, IntelliJ peut afficher les packages de manière compacte (`com.ganatan.cinema.generated`) : cela ne change pas la structure réelle des répertoires.

### C. Si IntelliJ affiche deux modules

Pendant l'import, deux modules nommés `java-ant-junit-xsd` et `java-ant-junit-xsd2` peuvent apparaître. Vérifier dans **Modules → Sources** et **Modules → Dependencies** quel module contient `Main`, `Film` et `FilmTest`. Les répertoires nécessaires doivent être correctement pris en compte sur le classpath du module utilisé pour compiler et exécuter les tests.

Si un module est réellement en doublon, le retirer **de la configuration IntelliJ seulement**, sans supprimer les fichiers du disque. Il n'est pas nécessaire de supprimer un module dès qu'on voit deux noms : vérifier d'abord leurs dossiers et dépendances.

### D. Dépendance JUnit dans IntelliJ

Pour `ant test`, la présence de `lib/junit.jar` suffit grâce au classpath déclaré dans `build.xml`.

Pour lancer `FilmTest` **avec le triangle vert d'IntelliJ**, ajouter aussi ce JAR dans **Project Structure → Modules → Dependencies**, sur le module du test. Le JAR sur disque ne devient pas automatiquement une dépendance IntelliJ.

Après configuration : **Apply → OK**, puis **Build → Rebuild Project**, et relancer `Main` ou `FilmTest`.

## 6. Dépannage : les erreurs réellement rencontrées

### `package com.ganatan.cinema.generated does not exist`

**Cause fréquente :** les classes n'ont pas encore été générées, ou IntelliJ ne les voit pas parmi ses sources.

```bat
ant generate
ant compile
```

Vérifier l'existence de `src/generated/com/ganatan/cinema/generated/Film.java`, puis configurer les racines sources du module dans IntelliJ.

### `cannot find symbol: class Film`

Même diagnostic : contrôler le fichier `Film.java`, son package et son rattachement au module qui compile `Main` ou `FilmTest`.

### `package javax.xml.bind.annotation does not exist`

Les fichiers générés importent JAXB, par exemple :

```java
import javax.xml.bind.annotation.XmlRegistry;
```

**Cause fréquente :** IntelliJ utilise un JDK 11+ pour compiler, même si le *Language level* est positionné sur 8. Sélectionner le **JDK 8** dans **Project SDK** et **Module SDK**, puis reconstruire le projet. Des distributions Java atypiques peuvent également nécessiter les composants JAXB appropriés.

### `No candidates found for method call film.getAnnee()`

Cela peut être une conséquence des classes générées absentes ou non résolues. Vérifier d'abord les imports et la compilation ; ne pas modifier le code généré pour contourner une erreur de configuration.

### `Generated source files should not be edited`

**Avertissement normal.** Modifier le XSD plutôt que `Film.java` ou `ObjectFactory.java`.

### Tests JUnit indisponibles dans IntelliJ

Vérifier simultanément :

1. `lib/junit.jar` existe.
2. Ce JAR est déclaré dans les **Dependencies du module IntelliJ**.
3. `test` est marqué **Test Sources Root**.
4. Le module utilisé pour lancer le test voit les sources générées.

### `xjc` n'est pas reconnu

Vérifier le JDK et le `PATH`. En Java 8, l'exécutable XJC peut être présent dans le dossier `bin` du JDK ; il n'est pas installé par Ant lui-même.

## 7. Comprendre les responsabilités

```text
film.xsd
   |
   | XJC, lancé par Ant
   v
src/generated/.../Film.java
   |
   | javac, lancé par Ant ou IntelliJ
   v
build/classes/.../Film.class
   |
   | utilisé par Main.java et FilmTest.java
   v
dist/app.jar
```

- **XSD** décrit un format de données.
- **XJC/JAXB** produit des classes Java correspondant à ce format.
- **Ant** orchestre génération, compilation, tests et packaging via `build.xml`.
- **JUnit** vérifie le comportement attendu.
- **IntelliJ** a sa propre configuration de modules, dossiers sources, JDK et dépendances, distincte de celle d'Ant.

## 8. Modifier le XSD

Pour ajouter un champ au modèle :

1. Modifier `src/misc/film.xsd`.
2. Relancer `ant generate`.
3. Recompiler avec `ant compile`.
4. Adapter `Main` et `FilmTest` à la nouvelle structure.
5. Lancer `ant test` et `ant jar`.

Les fichiers Java sous `src/generated` sont ignorés par Git : ils sont reconstruits localement. Conserver les **fichiers XSD** et le **build.xml** comme sources de vérité.
