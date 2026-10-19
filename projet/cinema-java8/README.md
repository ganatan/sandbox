# Cinéma Java 8 — trois bibliothèques JAR, aucune application

Ce monorepo est un exercice pour comprendre **les dépendances entre bibliothèques**, le **classpath**, la **compilation de JAR**, et les **tests JUnit 3 `TestCase`**. Il ne contient **aucune application** ni méthode `main` métier. Les tests sont lancés par le runner JUnit.

## 1. Architecture

```text
cinema-java8/
├── film-model/
│   ├── build/
│   │   ├── dependencies.properties
│   │   └── test-dependencies.properties
│   ├── conf-coverage/
│   │   └── Logger/
│   │       └── log4j-for-coverage.xml
│   ├── dist/
│   ├── src/com/ganatan/cinema/model/Film.java
│   ├── test/com/ganatan/cinema/model/FilmTest.java
│   └── tools/
├── film-catalogue/
│   ├── build/
│   ├── conf-coverage/
│   ├── dist/
│   ├── src/com/ganatan/cinema/catalogue/Catalogue.java
│   ├── test/com/ganatan/cinema/catalogue/CatalogueTest.java
│   └── tools/
├── film-format/
│   ├── build/
│   ├── conf-coverage/
│   ├── dist/
│   ├── src/com/ganatan/cinema/format/FormatFilm.java
│   ├── test/com/ganatan/cinema/format/FormatFilmTest.java
│   └── tools/
├── build.bat
├── build.sh
├── test.bat
└── test.sh
```

Les trois modules sont des **bibliothèques**, non des programmes autonomes.

| Bibliothèque | Fonction | Dépendances de production |
|---|---|---|
| film-model | Objet Film | Aucune |
| film-catalogue | Fournit un film | film-model.jar |
| film-format | Formate un film | film-model.jar |

```text
film-catalogue.jar ----> film-model.jar
film-format.jar -------^
```

L'ordre de compilation est `model`, puis `catalogue` et `format`.

## 2. Prérequis

- **JDK 8** avec `java`, `javac` et `jar` accessibles dans le PATH.
- **JUnit 3.8.2**, seulement pour compiler et lancer les tests.
- Sous Linux, Bash. Sous Windows, l'invite de commandes **CMD**.

Vérifier :

```bat
java -version
javac -version
jar
```

Le JAR JUnit peut être téléchargé sur Maven Central : https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar . Maven lui-même n'est pas nécessaire.

Placer éventuellement ce JAR dans `lib/junit-3.8.2.jar` à la racine du projet (il n'est pas fourni dans Git).

Windows CMD :

```bat
cd /d D:\demo\cinema-java8
set "JUNIT_JAR=D:\demo\cinema-java8\lib\junit-3.8.2.jar"
dir "%JUNIT_JAR%"
```

Linux :

```bash
cd /chemin/vers/cinema-java8
export JUNIT_JAR="$PWD/lib/junit-3.8.2.jar"
test -f "$JUNIT_JAR"
```

La variable `JUNIT_JAR` doit contenir **le chemin du fichier JAR**, et non celui du dossier.

## 3. Code de production

`film-model/src/com/ganatan/cinema/model/Film.java` :

```java
package com.ganatan.cinema.model;

public class Film {
    private final String titre;
    private final int annee;

    public Film(String titre, int annee) {
        this.titre = titre;
        this.annee = annee;
    }

    public String getTitre() {
        return titre;
    }

    public int getAnnee() {
        return annee;
    }
}
```

`film-catalogue/src/com/ganatan/cinema/catalogue/Catalogue.java` :

```java
package com.ganatan.cinema.catalogue;

import com.ganatan.cinema.model.Film;

public class Catalogue {
    public Film premierFilm() {
        return new Film("Interstellar", 2014);
    }
}
```

`film-format/src/com/ganatan/cinema/format/FormatFilm.java` :

```java
package com.ganatan.cinema.format;

import com.ganatan.cinema.model.Film;

public class FormatFilm {
    public String afficher(Film film) {
        return film.getTitre() + " (" + film.getAnnee() + ")";
    }
}
```

## 4. Compiler les trois bibliothèques et produire les JAR

Windows CMD, depuis la racine :

```bat
build.bat
```

Linux :

```bash
bash build.sh
```

Résultats :

```text
film-model/dist/film-model.jar
film-catalogue/dist/film-catalogue.jar
film-format/dist/film-format.jar
```

Les fichiers `.class` intermédiaires sont dans `.out/` à la racine ; **`build/` dans chaque module conserve les propriétés de configuration**.

Exemple des instructions exécutées pour construire `film-model` sous Windows :

```bat
javac -source 8 -target 8 -d .out\model film-model\src\com\ganatan\cinema\model\Film.java
jar cf film-model\dist\film-model.jar -C .out\model .
```

Exemple : compiler `Catalogue` en fournissant la dépendance `film-model.jar` :

```bat
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\catalogue film-catalogue\src\com\ganatan\cinema\catalogue\Catalogue.java
jar cf film-catalogue\dist\film-catalogue.jar -C .out\catalogue .
```

Le `-cp` (classpath) permet à `javac` de retrouver la classe `Film` fournie par un autre JAR. Le `-d` fixe le dossier contenant les classes compilées. L'option `-C` de `jar` permet d'archiver des fichiers depuis un dossier.

Inspecter :

```bat
jar tf film-model\dist\film-model.jar
```

Il n'y a pas de `Main-Class` dans ces JAR. `java -jar film-model/dist/film-model.jar` n'est **pas** une commande de lancement valide pour cette bibliothèque.

## 5. Code des tests JUnit 3

Chaque test hérite de `junit.framework.TestCase`. JUnit 3 reconnaît les méthodes publiques sans argument dont le nom commence par `test`.

`film-model/test/com/ganatan/cinema/model/FilmTest.java` :

```java
package com.ganatan.cinema.model;

import junit.framework.TestCase;
import com.ganatan.cinema.model.Film;

public class FilmTest extends TestCase {
    public void testResultat() {
        System.out.println("00000000001");
        Film f = new Film("Alien", 1979);
        assertEquals("Alien", f.getTitre());
        assertEquals(1979, f.getAnnee());
    }
}
```

`film-catalogue/test/com/ganatan/cinema/catalogue/CatalogueTest.java` :

```java
package com.ganatan.cinema.catalogue;

import junit.framework.TestCase;

public class CatalogueTest extends TestCase {
    public void testResultat() {
        assertEquals("Interstellar", new Catalogue().premierFilm().getTitre());
    }
}
```

`film-format/test/com/ganatan/cinema/format/FormatFilmTest.java` :

```java
package com.ganatan.cinema.format;

import junit.framework.TestCase;
import com.ganatan.cinema.model.Film;

public class FormatFilmTest extends TestCase {
    public void testResultat() {
        assertEquals("Dune (2021)", new FormatFilm().afficher(new Film("Dune", 2021)));
    }
}
```

## 6. Exécuter **tous** les tests

Windows CMD :

```bat
test.bat
```

Ou explicitement :

```bat
test.bat all
```

Linux :

```bash
bash test.sh
bash test.sh all
```

Le script :
1. Vérifie que `JUNIT_JAR` existe.
2. Compile les trois bibliothèques et construit les trois JAR.
3. Compile les trois classes de test contre ces JAR et JUnit.
4. Exécute successivement `FilmTest`, `CatalogueTest` et `FormatFilmTest`.
5. S'arrête en cas d'échec de compilation ou de test.

Résultat attendu pour **chaque classe** :

```text
.
Time: 0.001

OK (1 test)
```

Le temps d'exécution est variable. Il y a **trois classes de test, trois méthodes de test**.

## 7. Exécuter les tests d'**une seule bibliothèque**

Windows CMD :

```bat
test.bat film-model
test.bat film-catalogue
test.bat film-format
```

Linux :

```bash
bash test.sh film-model
bash test.sh film-catalogue
bash test.sh film-format
```

Exemple :

```bat
test.bat film-model
```

Cette commande **recompile les trois JAR** pour garantir la présence des dépendances, mais ne compile et n'exécute que la classe de test **`FilmTest`**. Elle ne lance ni `CatalogueTest` ni `FormatFilmTest`.

Pour cibler une seule **méthode** `testResultat()`, le plus simple est IntelliJ : clic droit sur la méthode, puis `Run`. Le runner JUnit 3 en ligne de commande utilisé ici sélectionne une classe, et exécute toutes ses méthodes `test...`.

## 8. Exécution manuelle d'une seule classe de test sous Windows

Après `build.bat` et configuration de `JUNIT_JAR` :

```bat
mkdir .out\tests
javac -source 8 -target 8 -cp "film-model\dist\film-model.jar;%JUNIT_JAR%" -d .out\tests film-model\test\com\ganatan\cinema\model\FilmTest.java
java -cp ".out\tests;film-model\dist\film-model.jar;%JUNIT_JAR%" junit.textui.TestRunner com.ganatan.cinema.model.FilmTest
```

Ici :
- `.out\tests` contient `FilmTest.class` ;
- `film-model.jar` contient la classe `Film` ;
- `junit-3.8.2.jar` contient `TestCase` et `TestRunner` ;
- `junit.textui.TestRunner` est le lanceur des tests et non le `main()` de notre bibliothèque ;
- `com.ganatan.cinema.model.FilmTest` est le nom complet de la classe testée.

Sous Linux, le séparateur du classpath est `:` ; sous Windows, c'est `;`.

## 9. IntelliJ IDEA

1. Ouvrir le dossier `cinema-java8/`.
2. Vérifier `Project SDK = JDK 8`.
3. Si nécessaire, marquer `src/` comme `Sources Root` et `test/` comme `Test Sources Root`.
4. Ajouter `junit-3.8.2.jar` aux dépendances de test du module IntelliJ concerné.
5. Ajouter les JAR des bibliothèques nécessaires aux dépendances du module.
6. Ouvrir `FilmTest.java`, clic droit sur `testResultat()`, puis **Run**.
7. Pour une classe de test entière, clic droit sur le nom de classe `FilmTest`, puis **Run**.

Une configuration IntelliJ correcte n'est pas nécessaire pour exécuter `test.bat`, car le script construit lui-même son classpath. Inversement, la présence des fichiers `dependencies.properties` n'enregistre pas automatiquement les dépendances dans IntelliJ.

## 10. Pourquoi les fichiers build/dependencies.properties existent-ils ?

Chaque module contient :
- `build/dependencies.properties` : dépendances de production du module ;
- `build/test-dependencies.properties` : dépendances nécessaires aux tests.

Dans cet exercice, ces fichiers **documentent** les dépendances : les scripts `build.bat`, `build.sh`, `test.bat` et `test.sh` définissent actuellement les chemins des JAR explicitement. Les scripts **ne lisent pas encore** les propriétés. Ce choix évite d'inventer un format de build propriétaire.

Le dossier `conf-coverage/Logger/` contient un exemple de configuration Log4j pour reproduire l'arborescence observée. Ni Log4j ni l'instrumentation de couverture ne sont activés dans cet exercice.

## 11. Erreurs fréquentes

| Erreur | Cause probable | Solution |
|---|---|---|
| `JUNIT_JAR` non défini | Variable absente | Définir la variable dans le terminal actuel |
| `junit.textui.TestRunner` introuvable | JUnit absent du classpath | Vérifier `dir "%JUNIT_JAR%"` |
| `TestCase` rouge dans IntelliJ | JUnit non référencé par le module | Ajouter le JAR comme dépendance de test |
| `Film` introuvable | `film-model.jar` absent | Recompiler et vérifier `-cp` |
| `no main manifest attribute` | On tente de lancer une bibliothèque avec `java -jar` | Exécuter les tests plutôt que le JAR |
| `UnsupportedClassVersionError` | Version Java incompatible | Vérifier `java -version` et `javac -version` |

## 12. Exercice pratique

1. Exécuter `test.bat all` ; les trois tests doivent passer.
2. Modifier `film-catalogue/src/.../Catalogue.java` en remplaçant `Interstellar` par `Dune`.
3. Exécuter `test.bat film-catalogue` ; le test doit échouer car il attend encore `Interstellar`.
4. Modifier `CatalogueTest.java` pour attendre `Dune`.
5. Relancer `test.bat film-catalogue` ; le test doit réussir.
6. Lancer `test.bat all` pour vérifier l'ensemble du monorepo.

**Le principe à retenir :** une bibliothèque peut être compilée en JAR et validée par `TestCase` sans aucune application principale.
