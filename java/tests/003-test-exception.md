# Tester une exception avec JUnit 4

## 1. Objectif

Vérifier qu'une méthode Java déclenche une exception lorsque les données reçues sont incorrectes.

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

Créer `src/Media.java`.

```java
public class Media {

    public boolean isMovie(int duration) {

        if (duration < 0) {
            throw new IllegalArgumentException("Durée invalide");
        }

        return duration >= 60;
    }
}
```

La méthode applique trois règles :

| Durée | Résultat |
|---|---|
| 120 | true |
| 30 | false |
| -10 | IllegalArgumentException |

Une durée négative est considérée comme invalide.

## 4. Classe MediaTest.java

Créer `src/MediaTest.java`.

```java
import org.junit.Test;
import static org.junit.Assert.*;

public class MediaTest {

    @Test
    public void testMovie() {
        Media media = new Media();

        assertTrue(media.isMovie(120));
    }

    @Test
    public void testShortMovie() {
        Media media = new Media();

        assertFalse(media.isMovie(30));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDuration() {
        Media media = new Media();

        media.isMovie(-10);
    }
}
```

## 5. Comprendre expected

```java
@Test(expected = IllegalArgumentException.class)
```

Cette annotation indique à JUnit que le test doit provoquer une exception de type `IllegalArgumentException`.

Le test réussit si cette exception est déclenchée pendant son exécution.

Le test échoue si :

- Aucune exception n'est déclenchée.
- Une exception d'un autre type est déclenchée.

## 6. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\Media.java src\MediaTest.java
```

## 7. Exécution

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
...
Time: 0.01

OK (3 tests)
```

## 8. Tester le message de l'exception

Il est également possible de vérifier le message retourné.

Ajouter ce quatrième test à `MediaTest.java` :

```java
@Test
public void testExceptionMessage() {
    Media media = new Media();

    try {
        media.isMovie(-10);
        fail("Une exception était attendue");
    } catch (IllegalArgumentException e) {
        assertEquals("Durée invalide", e.getMessage());
    }
}
```

| Élément | Rôle |
|---|---|
| `try` | Exécute la méthode |
| `fail()` | Force l'échec si aucune exception n'est déclenchée |
| `catch` | Intercepte l'exception attendue |
| `assertEquals` | Vérifie le message de l'exception |

Après ajout du quatrième test, JUnit affiche `OK (4 tests)`.

## 9. À retenir

- Un test doit également vérifier les comportements incorrects.
- `@Test(expected = ...)` vérifie le type d'exception.
- `try/catch` permet de vérifier le contenu de l'exception.
- `fail()` provoque volontairement un échec.
- Les exceptions font partie du comportement attendu d'une méthode.
