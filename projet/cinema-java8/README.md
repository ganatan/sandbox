# Cinéma Java 8 — 3 bibliothèques et une application

Projet Java 8 sans Maven, Gradle ni dépendance externe. Chaque bibliothèque produit son propre JAR.

## Modules

| Module | Classe | Livrable | Dépendance |
|---|---|---|---|
| film-model | Film | film-model.jar | Aucune |
| film-catalogue | Catalogue | film-catalogue.jar | film-model.jar |
| film-format | FormatFilm | film-format.jar | film-model.jar |
| cinema-app | Main | cinema-app.jar | Les trois JAR |

## Compiler

Avec le JDK 8 installé et `javac` / `jar` dans le PATH :

Linux : `bash build.sh`

Windows CMD : `build.bat`

## Exécuter

```bash
java -jar dist/cinema-app.jar
```

Résultat :

```text
Interstellar (2014)
```

Les quatre JAR doivent rester ensemble dans `dist/`, car le manifeste de `cinema-app.jar` contient les dépendances dans `Class-Path`.

## Inspecter les JAR

```bash
jar tf dist/film-model.jar
jar xf dist/film-model.jar
```

## Lancer sans manifeste

Linux :

```bash
java -cp 'dist/*' com.ganatan.cinema.app.Main
```

Windows CMD :

```bat
java -cp "dist/*" com.ganatan.cinema.app.Main
```

## Exercice

Modifie `film-catalogue/src/com/ganatan/cinema/catalogue/Catalogue.java` pour retourner `new Film("Dune", 2021)`, recompile puis relance l'application.
