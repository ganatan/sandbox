# Cinema Java 8 — 3 bibliotheques et une application

Mini-monorepo Java 8, sans Maven ni Gradle. Chaque module a la meme structure :

```text
film-model/
    build/
        dependencies.properties
        test-dependencies.properties
    conf-coverage/
        Logger/
            log4j-for-coverage.xml
    dist/
    src/
    test/
    tools/
```

Les trois autres modules (`film-catalogue`, `film-format`, `cinema-app`) ont exactement ces repertoires.

## Modules

| Module | Fonction | Dependances |
|---|---|---|
| film-model | Classe Film | Aucune |
| film-catalogue | Retourne un Film | film-model |
| film-format | Formate un Film | film-model |
| cinema-app | Main | Les trois bibliotheques |

## Compiler et produire les JAR

Linux :

```bash
bash build.sh
java -jar cinema-app/dist/cinema-app.jar
```

Windows CMD :

```bat
build.bat
java -jar cinema-app\dist\cinema-app.jar
```

Resultat : `Interstellar (2014)`.

Chaque JAR est produit dans le `dist/` de son module. Les classes temporaires sont dans `.out/` a la racine, pas dans `build/`.

## Tests JUnit 3 (TestCase)

Prevoir localement `junit-3.8.2.jar`.

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

Les tests utilisent `extends junit.framework.TestCase` et `junit.textui.TestRunner`.

## Role des fichiers de configuration

`build/dependencies.properties` et `build/test-dependencies.properties` documentent les dependances dans cet exemple. Les scripts de demonstration definissent leur classpath explicitement ; ils ne lisent pas encore ces fichiers.

`conf-coverage/Logger/log4j-for-coverage.xml` reproduit l'emplacement observe dans le projet professionnel. La couverture et Log4j ne sont pas actives dans cet exemple.

`tools/` est reserve aux outils internes.

## Exercices

Change Interstellar en Dune dans `film-catalogue/src/`, adapte le test dans `film-catalogue/test/`, puis recompile et relance.
