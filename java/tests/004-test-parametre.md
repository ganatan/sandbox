# Test paramétré avec JUnit 4

## 1. Objectif

Exécuter plusieurs fois le même test avec différentes valeurs.

Environnement :

- Java 8
- JUnit 4.13.2
- Sans Maven
- Sans Gradle

## 2. Principe

Une méthode `isMovie()` reçoit une durée en minutes.

Elle retourne `true` si la durée est supérieure ou égale à 60.

| Durée | Résultat attendu |
|---|---|
| 0 | false |
| 30 | false |
| 59 | false |
| 60 | true |
| 90 | true |
| 120 | true |

Plutôt que d'écrire six méthodes de test, on utilise un test paramétré.

## 3. Arborescence

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

## 4. Classe Media.java

Créer le fichier `src/Media.java`.

```java
public class Media {

    public boolean isMovie(int duration) {
        return duration >= 60;
    }
}
```

## 5. Classe MediaTest.java

Créer le fichier `src/MediaTest.java`.

```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class MediaTest {

    private final int duration;
    private final boolean expected;

    public MediaTest(int duration, boolean expected) {
        this.duration = duration;
        this.expected = expected;
    }

    @Parameterized.Parameters(name = "duration={0}, expected={1}")
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {0, false},
            {30, false},
            {59, false},
            {60, true},
            {90, true},
            {120, true}
        });
    }

    @Test
    public void testIsMovie() {
        Media media = new Media();

        boolean result = media.isMovie(duration);

        assertEquals(expected, result);
    }
}
```

## 6. Explications

| Élément | Rôle |
|---|---|
| `@RunWith(Parameterized.class)` | Active le moteur de tests paramétrés |
| `@Parameterized.Parameters` | Fournit les données |
| `Collection<Object[]>` | Contient les jeux de données |
| `MediaTest(...)` | Reçoit les paramètres pour chaque exécution |
| `@Test` | Définit la méthode de test |
| `assertEquals` | Compare le résultat attendu au résultat obtenu |

Chaque ligne représente un jeu de paramètres. JUnit crée une instance de `MediaTest` pour chaque ligne et exécute la méthode annotée `@Test`.

## 7. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\Media.java src\MediaTest.java
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/Media.java src/MediaTest.java
```

## 8. Exécution

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
......
Time: 0.01

OK (6 tests)
```

## 9. Provoquer un échec

Modifier une valeur attendue :

```java
{30, true}
```

La méthode `isMovie(30)` retourne `false`. JUnit détecte une différence entre le résultat attendu et le résultat obtenu.

Exemple de résultat :

```text
There was 1 failure:
1) testIsMovie[duration=30, expected=true](MediaTest)
java.lang.AssertionError: expected:<true> but was:<false>

FAILURES!!!
Tests run: 6, Failures: 1
```

## 10. Exécution avec IntelliJ IDEA

1. Ouvrir le projet dans IntelliJ.
2. Vérifier que le SDK est Java 8.
3. Ajouter JUnit et Hamcrest dans les dépendances du module.
4. Ouvrir `MediaTest.java`.
5. Cliquer sur l'icône d'exécution à côté de la classe.
6. Sélectionner `Run 'MediaTest'`.

IntelliJ affiche les six exécutions et permet d'identifier le jeu de données qui échoue.

## 11. À retenir

- Un test paramétré vérifie plusieurs valeurs avec une seule méthode.
- `@RunWith(Parameterized.class)` active cette fonctionnalité dans JUnit 4.
- `@Parameterized.Parameters` définit les données.
- Chaque ligne produit une exécution indépendante.
- Les tests paramétrés sont utiles pour tester les valeurs limites.
- Ils permettent de réduire la duplication du code.
