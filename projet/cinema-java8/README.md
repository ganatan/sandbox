# Cinema Java 8 - 3 JAR et une application

Exemple de monorepo Java 8 sans Maven ni Gradle.

Chaque module contient `src/`, `test/` et `tools/` :

- `film-model` : objet Film
- `film-catalogue` : creation d'un Film, depend de film-model
- `film-format` : affichage d'un Film, depend de film-model
- `cinema-app` : application avec Main, depend des 3 bibliotheques

## Compilation

Linux : `bash build.sh`

Windows CMD : `build.bat`

Les quatre JAR sont crees dans `dist/`.

## Execution

```bash
java -jar dist/cinema-app.jar
```

Resultat : `Interstellar (2014)`.

Le manifeste de l'application contient `Main-Class` et `Class-Path`. Les bibliotheques n'ont pas de Main-Class.

## Tests - JUnit 3

Chaque dossier `test/` contient une classe qui `extends junit.framework.TestCase` avec une methode `testResultat()`.

Il faut un JAR JUnit 3.8.2 accessible localement. Aucun telechargement automatique et aucun JAR tiers n'est versionne dans le depot.

Linux :

```bash
export JUNIT_JAR=/chemin/vers/junit-3.8.2.jar
bash test.sh
```

Windows CMD :

```bat
set JUNIT_JAR=C:\chemin\vers\junit-3.8.2.jar
test.bat
```

Le runner utilise `junit.textui.TestRunner` et renvoie un code d'erreur si les tests echouent.

## Comprendre les JAR

```bash
jar tf dist/film-model.jar
```

## Exercice

Changer `Interstellar` pour `Dune` dans `film-catalogue/src/`, adapter ses tests puis relancer la compilation et les tests.
