# Premier test unitaire Java 8

## 1. Objectif

Créer une classe Java et vérifier son comportement avec JUnit 4.

Environnement :

- Java 8
- JUnit 4.13.2
- Sans Maven
- Sans Gradle

## 2. Arborescence

```text
java-junit/
├── lib/
│   ├── junit-4.13.2.jar
│   └── hamcrest-core-1.3.jar
├── src/
│   ├── Media.java
│   └── MediaTest.java
└── build/
```

## 3. Classe Media.java

Créer le fichier `src/Media.java`.

```java
public class Media {

    public boolean isMovie(int duration) {
        return duration >= 60;
    }
}
```

La méthode `isMovie` reçoit une durée en minutes.

Elle retourne :

- `true` si la durée est supérieure ou égale à 60.
- `false` si la durée est inférieure à 60.

## 4. Classe MediaTest.java

Créer le fichier `src/MediaTest.java`.

```java
import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

public class MediaTest {

    @Test
    public void testMovie() {
        Media media = new Media();

        boolean result = media.isMovie(120);

        assertTrue(result);
    }

    @Test
    public void testShortMovie() {
        Media media = new Media();

        boolean result = media.isMovie(30);

        assertFalse(result);
    }
}
```

| Élément | Rôle |
|---|---|
| `@Test` | Identifie une méthode de test |
| `Media media` | Crée l'objet à tester |
| `isMovie(120)` | Appelle la méthode |
| `assertTrue` | Vérifie que le résultat est vrai |
| `assertFalse` | Vérifie que le résultat est faux |

## 5. Installation de JUnit

Télécharger les bibliothèques :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Placer les deux JAR dans le répertoire `lib`.

## 6. Compilation

Depuis le répertoire racine du projet.

```bat
mkdir build
javac -cp "lib/*" -d build src\Media.java src\MediaTest.java
```

Résultat :

```text
build/
├── Media.class
└── MediaTest.class
```

## 7. Exécution des tests

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore MediaTest
```

Linux :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore MediaTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
..
Time: 0.01

OK (2 tests)
```

## 8. Provoquer une erreur

Modifier volontairement le premier test :

```java
@Test
public void testMovie() {
    Media media = new Media();

    boolean result = media.isMovie(30);

    assertTrue(result);
}
```

Le test échoue car `isMovie(30)` retourne `false`.

```text
There was 1 failure:
1) testMovie(MediaTest)
java.lang.AssertionError

FAILURES!!!
Tests run: 2, Failures: 1
```

## 9. Exécution avec IntelliJ IDEA

1. Ouvrir le projet dans IntelliJ.
2. Sélectionner le SDK Java 8.
3. Ajouter les deux bibliothèques JAR aux dépendances du module.
4. Ouvrir `MediaTest.java`.
5. Cliquer sur l'icône verte à côté de la classe.
6. Sélectionner `Run 'MediaTest'`.

IntelliJ affiche les résultats des tests.

## 10. À retenir

- `@Test` indique une méthode de test.
- `assertTrue` vérifie une condition vraie.
- `assertFalse` vérifie une condition fausse.
- Chaque test est exécuté indépendamment.
- Un test réussi confirme le comportement vérifié.
- Un test échoué signale un écart entre le résultat attendu et le résultat réel.
- JUnit 4 fonctionne avec Java 8 sans Maven.
