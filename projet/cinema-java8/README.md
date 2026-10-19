# Cinéma Java 8 — trois bibliothèques, Apache Ant et JUnit 3

Projet d'apprentissage **sans application principale**, **sans Maven**, **sans Gradle**. Trois modules Java 8 produisent chacun leur propre JAR, sont liés par des dépendances et possèdent leurs tests `extends TestCase`.

**Deux méthodes sont disponibles :**
- **Avec Apache Ant** : `ant jar`, `ant test`, `ant test-model`, `ant test-catalogue`, `ant test-format`.
- **Sans Ant** : `build.bat` / `build.sh`, `test.bat film-model` / `bash test.sh film-model`, ou les commandes manuelles `javac`, `jar`, `java`.

## 1. Arborescence

```text
cinema-java8/
├── build.xml
├── build.bat
├── build.sh
├── test.bat
├── test.sh
├── film-model/
│   ├── build.xml
│   ├── build/
│   │   ├── dependencies.properties
│   │   └── test-dependencies.properties
│   ├── conf-coverage/Logger/log4j-for-coverage.xml
│   ├── dist/
│   ├── src/com/ganatan/cinema/model/Film.java
│   ├── test/com/ganatan/cinema/model/FilmTest.java
│   └── tools/
├── film-catalogue/
│   ├── build.xml
│   ├── build/
│   │   ├── dependencies.properties
│   │   └── test-dependencies.properties
│   ├── conf-coverage/Logger/log4j-for-coverage.xml
│   ├── dist/
│   ├── src/com/ganatan/cinema/catalogue/Catalogue.java
│   ├── test/com/ganatan/cinema/catalogue/CatalogueTest.java
│   └── tools/
└── film-format/
    ├── build.xml
    ├── build/
    │   ├── dependencies.properties
    │   └── test-dependencies.properties
    ├── conf-coverage/Logger/log4j-for-coverage.xml
    ├── dist/
    ├── src/com/ganatan/cinema/format/FormatFilm.java
    ├── test/com/ganatan/cinema/format/FormatFilmTest.java
    └── tools/
```

Le répertoire `build/` de chaque module est **réservé aux propriétés de configuration**. Les classes compilées sont stockées dans `.out/` de chaque module avec Ant, ou dans `.out/` de la racine avec les scripts sans Ant. `dist/` reçoit le JAR de chaque bibliothèque. `conf-coverage/` reprend l'arborescence professionnelle, mais aucun outil de couverture n'est activé ici.

## 2. Dépendances et ordre

| Module | JAR | Dépendance |
|---|---|---|
| film-model | `film-model/dist/film-model.jar` | Aucune |
| film-catalogue | `film-catalogue/dist/film-catalogue.jar` | `film-model.jar` |
| film-format | `film-format/dist/film-format.jar` | `film-model.jar` |

```text
film-catalogue.jar ---> film-model.jar
film-format.jar ------> film-model.jar
```

Il faut d'abord construire `film-model`, puis `film-catalogue` et `film-format`. Le `build.xml` de la racine respecte cet ordre.

## 3. Prérequis

- **JDK 8** : `java`, `javac`, `jar`.
- **JUnit 3.8.2** : dépendance externe nécessaire **uniquement aux tests**.
- **Apache Ant** : nécessaire uniquement pour les commandes de la méthode Ant.
- CMD sous Windows ou Bash sous Linux.

Vérifier :

```bat
java -version
javac -version
ant -version
```

Lien direct JUnit : https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar

Placer `junit-3.8.2.jar` dans le répertoire local `lib/` à la racine. Ce JAR n'est pas versionné dans Git.

**Windows CMD** (adapter le chemin à ton poste) :

```bat
cd /d D:\demo\cinema-java8
set "JUNIT_JAR=D:\demo\cinema-java8\lib\junit-3.8.2.jar"
dir "%JUNIT_JAR%"
```

**Linux** :

```bash
cd /chemin/vers/cinema-java8
export JUNIT_JAR="$PWD/lib/junit-3.8.2.jar"
test -f "$JUNIT_JAR"
```

Sur Windows, `set` ne persiste que dans le terminal courant. `JUNIT_JAR` désigne le **fichier**, pas seulement le dossier.

## 4. Code Java des bibliothèques

**film-model/src/com/ganatan/cinema/model/Film.java** :

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

**film-catalogue/src/com/ganatan/cinema/catalogue/Catalogue.java** :

```java
package com.ganatan.cinema.catalogue;

import com.ganatan.cinema.model.Film;

public class Catalogue {
    public Film premierFilm() {
        return new Film("Interstellar", 2014);
    }
}
```

**film-format/src/com/ganatan/cinema/format/FormatFilm.java** :

```java
package com.ganatan.cinema.format;

import com.ganatan.cinema.model.Film;

public class FormatFilm {
    public String afficher(Film film) {
        return film.getTitre() + " (" + film.getAnnee() + ")";
    }
}
```

Aucune bibliothèque n'a besoin de `public static void main(String[] args)`.

## 5. Code des tests JUnit 3

Les tests héritent de `junit.framework.TestCase`. Une méthode de test JUnit 3 est typiquement `public void test...()`.

**FilmTest.java** :

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

**CatalogueTest.java** :

```java
package com.ganatan.cinema.catalogue;

import junit.framework.TestCase;

public class CatalogueTest extends TestCase {
    public void testResultat() {
        assertEquals("Interstellar", new Catalogue().premierFilm().getTitre());
    }
}
```

**FormatFilmTest.java** :

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

Le `System.out.println("00000000001")` confirme visuellement que la méthode a été exécutée, tandis que les assertions vérifient les résultats.

## 6. Méthode A — Avec Apache Ant

Ant lit les fichiers `build.xml`. Une balise `<target>` représente une tâche nommée et `depends` définit l'ordre d'exécution. La cible `jar` fabrique un JAR et `test` compile puis exécute une classe `TestCase` via `junit.textui.TestRunner`.

**Toutes les commandes suivantes sont lancées depuis la racine du projet.**

| Action | Commande Ant |
|---|---|
| Compiler les trois modules et créer les JAR | `ant jar` |
| Construire l'ensemble | `ant` |
| Compiler l'ensemble (avec JAR) | `ant compile` |
| Exécuter tous les tests | `ant test` |
| Tester uniquement FilmTest | `ant test-model` |
| Tester uniquement CatalogueTest | `ant test-catalogue` |
| Tester uniquement FormatFilmTest | `ant test-format` |
| Nettoyer classes et JAR | `ant clean` |
| Voir les cibles | `ant -p` |
| Afficher les détails | `ant -verbose test-model` |

Exemple Windows :

```bat
cd /d D:\demo\cinema-java8
set "JUNIT_JAR=D:\demo\cinema-java8\lib\junit-3.8.2.jar"
ant test-model
```

Exemple Linux :

```bash
export JUNIT_JAR="$PWD/lib/junit-3.8.2.jar"
ant test
```

`ant test-model` ne lance **que FilmTest**. `ant test` lance les trois classes, et s'arrête à la première erreur. Ant construit automatiquement les JAR prérequis dans l'ordre. La compilation de dépendances n'est pas la même chose que leur exécution de tests.

**Lancer une bibliothèque directement**, une fois ses dépendances construites :

```bat
cd film-model
ant compile
ant test
ant jar
cd ..
```

Pour `film-catalogue`, commencer par `ant -f film-model/build.xml jar` depuis la racine, puis :

```bat
cd film-catalogue
ant test
cd ..
```

Ou plus simplement, depuis la racine : `ant test-catalogue`.

### Exemple commenté par les concepts (XML réel de film-model)

```xml
<project name="film-model" default="jar" basedir=".">
    <property environment="env"/>
    <property file="build/dependencies.properties"/>
    <property file="build/test-dependencies.properties"/>
    <property name="classes.dir" location=".out/classes"/>
    <property name="tests.dir" location=".out/tests"/>
    <property name="dist.jar" location="dist/film-model.jar"/>

    <path id="production.path">
    </path>

    <path id="test.path">
        <path refid="production.path"/>
        <pathelement location="${classes.dir}"/>
        <pathelement location="${tests.dir}"/>
        <pathelement location="${test.junit.path}"/>
    </path>

    <target name="compile">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="src" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="production.path"/>
        </javac>
    </target>

    <target name="jar" depends="compile">
        <mkdir dir="dist"/>
        <jar destfile="${dist.jar}" basedir="${classes.dir}"/>
    </target>

    <target name="test" depends="compile">
        <available file="${test.junit.path}" property="junit.available"/>
        <fail unless="junit.available" message="Definir JUNIT_JAR vers junit-3.8.2.jar"/>
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="test" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="test.path"/>
        </javac>
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="com.ganatan.cinema.model.FilmTest"/>
            <classpath refid="test.path"/>
        </java>
    </target>
    <target name="clean">
        <delete dir=".out"/>
        <delete file="${dist.jar}"/>
    </target>
</project>
```

- `property environment="env"` récupère `JUNIT_JAR` comme `${env.JUNIT_JAR}`.
- `property file="..."` charge les propriétés des modules.
- `path` constitue le classpath de compilation ou de test.
- `javac` compile les `.java` en `.class`.
- `jar` crée un JAR de bibliothèque.
- `java classname="junit.textui.TestRunner"` exécute JUnit 3. L'option `failonerror` fait échouer le build si le runner sort avec une erreur.

L'exemple utilise la tâche Ant `java`, **pas** la tâche optionnelle Ant `junit` : il n'y a donc pas besoin d'un module Ant-JUnit supplémentaire.

## 7. Fichiers dependencies.properties

**film-model/build/dependencies.properties** : aucune bibliothèque supplémentaire.

**film-catalogue/build/dependencies.properties** :

```properties
dependency.film-model=../film-model/dist/film-model.jar
```

**film-format/build/dependencies.properties** :

```properties
dependency.film-model=../film-model/dist/film-model.jar
```

**Chaque module : build/test-dependencies.properties**

```properties
test.junit.path=${env.JUNIT_JAR}
```

Ici, contrairement à la version initiale du projet, **Ant lit réellement les fichiers properties**. Le classpath de Catalogue et Format inclut leur dépendance Model, et le classpath de test inclut JUnit. Le script global construit les JAR dans l'ordre.

## 8. Méthode B — Sans Ant avec les scripts existants

Les scripts manuels restent disponibles : ils ne nécessitent pas Ant.

Windows CMD :

```bat
build.bat
test.bat all
test.bat film-model
test.bat film-catalogue
test.bat film-format
```

Linux :

```bash
bash build.sh
bash test.sh all
bash test.sh film-model
bash test.sh film-catalogue
bash test.sh film-format
```

Les scripts de test recompilent **les trois** JAR de production, même si un seul test est sélectionné. En revanche, ils ne compilent et n'exécutent que le `TestCase` demandé.

Les scripts définissent eux-mêmes les chemins de dépendances et **ne lisent pas** les fichiers `.properties`. C'est précisément une différence pédagogique avec Ant.

## 9. Méthode C — Commandes manuelles javac, jar et java

Pour comprendre exactement les mécanismes, voici les commandes **Windows CMD depuis la racine**.

### Compiler film-model

```bat
mkdir .out\model
javac -source 8 -target 8 -d .out\model film-model\src\com\ganatan\cinema\model\Film.java
```

### Créer son JAR

```bat
jar cf film-model\dist\film-model.jar -C .out\model .
jar tf film-model\dist\film-model.jar
```

### Compiler film-catalogue qui dépend du JAR Model

```bat
mkdir .out\catalogue
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\catalogue film-catalogue\src\com\ganatan\cinema\catalogue\Catalogue.java
jar cf film-catalogue\dist\film-catalogue.jar -C .out\catalogue .
```

### Compiler une seule classe TestCase

```bat
mkdir .out\tests
javac -source 8 -target 8 -cp "film-model\dist\film-model.jar;%JUNIT_JAR%" -d .out\tests film-model\test\com\ganatan\cinema\model\FilmTest.java
```

### Exécuter une seule classe de test

```bat
java -cp ".out\tests;film-model\dist\film-model.jar;%JUNIT_JAR%" junit.textui.TestRunner com.ganatan.cinema.model.FilmTest
```

Un succès ressemble à ceci :

```text
00000000001
.
Time: 0.001

OK (1 test)
```

L'ordre exact et le temps affiché peuvent varier selon le runner.

**Options importantes :**

| Élément | Signification |
|---|---|
| `javac` | Compile un fichier Java en bytecode `.class` |
| `-source 8 -target 8` | Demande une compilation au format Java 8 |
| `-cp` / `-classpath` | Définit les classes et JAR accessibles |
| `-d` | Destination des `.class` |
| `jar cf` | Crée une archive JAR |
| `-C dossier .` | Archive le contenu du dossier |
| `java -cp` | Exécute une classe avec ses dépendances |
| `junit.textui.TestRunner` | Classe principale fournie par JUnit, et non par notre projet |

Windows utilise `;` pour séparer les entrées du classpath ; Linux utilise `:`.

## 10. Exécuter les tests dans IntelliJ

1. Ouvrir `cinema-java8` et sélectionner le JDK 8.
2. Configurer les répertoires `src/` comme **Sources Root** et `test/` comme **Test Sources Root**.
3. Ajouter localement `junit-3.8.2.jar` aux dépendances de test.
4. Ajouter au module Catalogue ou Format le JAR `film-model.jar`, ou créer des dépendances vers le module Model.
5. Ouvrir `FilmTest.java` et exécuter `testResultat()` via **Run**.

Si IntelliJ propose Ant, il est aussi possible d'ouvrir la fenêtre Ant et d'y ajouter le fichier `build.xml` pour lancer les cibles.

## 11. Erreurs fréquentes

| Erreur | Explication | Correction |
|---|---|---|
| `ant: command not found` | Ant absent du PATH | Installer Ant ou utiliser les scripts manuels |
| `Unable to find a javac compiler` | JDK absent ou configuration Ant incorrecte | Définir `JAVA_HOME` sur le JDK 8 |
| `JUNIT_JAR` non défini | Test sans bibliothèque JUnit | Définir le chemin complet vers le JAR |
| `junit.textui.TestRunner` introuvable | Classpath JUnit incorrect | Vérifier le JAR et le classpath |
| `package ...model does not exist` | Model non construit ou absent des dépendances | Construire Model puis le module utilisateur |
| `TestCase` rouge dans IntelliJ | Bibliothèque non chargée | Ajouter JUnit aux dépendances de test |
| `no main manifest attribute` | Essai de `java -jar` sur une bibliothèque | Lancer `TestRunner`, pas le JAR |

## 12. Exercice complet

1. Lancer `ant clean`, puis `ant jar`.
2. Vérifier les trois fichiers `.jar` dans leurs répertoires `dist/`.
3. Lancer `ant test` : trois tests doivent passer.
4. Modifier `Catalogue.java` pour retourner `new Film("Dune", 2021)`.
5. Lancer `ant test-catalogue` : le test doit échouer car il attend `Interstellar`.
6. Adapter `CatalogueTest.java` pour attendre `Dune`.
7. Relancer `ant test-catalogue`, puis `ant test`.
8. Refaire l'exercice **sans Ant** avec `test.bat film-catalogue` ou `bash test.sh film-catalogue`.

**À retenir :** Java compile, JUnit teste, Ant orchestre. Une bibliothèque peut parfaitement être compilée et testée sans méthode `main()` dans son code métier.
