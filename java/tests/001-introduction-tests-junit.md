# Introduction aux tests et à JUnit

## 1. Principe

Les tests logiciels vérifient qu'une application respecte ses spécifications. Ils détectent des erreurs et réduisent le risque de régression.

JUnit est un framework open source utilisé pour automatiser l'exécution des tests Java, vérifier les résultats et signaler les échecs.

## 2. Les types de tests

| Type | Objectif |
|---|---|
| Test unitaire | Vérifier une unité de code isolée |
| Test d'intégration | Vérifier l'interaction entre plusieurs composants |
| Test système | Vérifier une application complète |
| Test d'acceptation | Valider les exigences métier |
| Test de non-régression | Vérifier qu'une modification ne casse pas le comportement existant |

Un test unitaire ou d'intégration peut également être un test de non-régression.

## 3. Test unitaire

Un test unitaire vérifie une méthode ou une classe, généralement sans réseau, base de données ou autres dépendances externes.

```java
public class Media {

    public boolean isMovie(int duration) {
        return duration >= 60;
    }
}
```

| Durée | Résultat attendu |
|---|---|
| 30 | false |
| 59 | false |
| 60 | true |
| 120 | true |

Les tests unitaires doivent être rapides, reproductibles et indépendants.

## 4. Test d'intégration

Un test d'intégration vérifie plusieurs composants ensemble :

```text
UDP Emitter
    |
    | Datagramme UDP
    v
UDP Receiver
    |
    v
Décodage du message
```

Il peut vérifier la construction du message, la transmission UDP, la réception et le décodage du contenu.

JUnit permet d'exécuter des tests unitaires **et** des tests d'intégration : ce n'est pas un type de test, mais un framework de tests.

## 5. Historique de JUnit

JUnit a été créé par Kent Beck et Erich Gamma dans les années 1990. Il appartient à la famille des outils xUnit, inspirée notamment de SUnit.

| Période | Version | Évolution |
|---|---|---|
| Fin des années 1990 | JUnit 1 | Premières versions |
| Années 2000 | JUnit 3 | Héritage de `TestCase` et conventions de nommage |
| 2006 | JUnit 4 | Annotations `@Test`, `@Before`, `@After` |
| 2017 | JUnit 5 | Architecture Platform, Jupiter et Vintage |
| 2025 | JUnit 6 | Java 17 minimum, évolution de JUnit 5 |

## 6. Versions et compatibilité Java

| Version | Java minimum | Particularités |
|---|---|---|
| JUnit 3 | Anciennes versions de Java | `TestCase` |
| JUnit 4 | Java 5 | Annotations, runners, rules |
| JUnit 5 | Java 8 | Jupiter, Platform, extensions |
| JUnit 6 | Java 17 | Nouvelle génération de la plateforme |

Pour Java 8, **JUnit 4.13.2** est simple à utiliser sans Maven. JUnit 5.x est également possible en choisissant des artefacts compatibles avec Java 8. JUnit 6 ne fonctionne pas sous Java 8.

## 7. JUnit 4 et JUnit 5

| Fonctionnalité | JUnit 4 | JUnit 5 (Jupiter) |
|---|---|---|
| Test | `@Test` | `@Test` |
| Avant chaque test | `@Before` | `@BeforeEach` |
| Après chaque test | `@After` | `@AfterEach` |
| Avant tous les tests | `@BeforeClass` | `@BeforeAll` |
| Après tous les tests | `@AfterClass` | `@AfterAll` |
| Assertions | `Assert` | `Assertions` |
| Personnalisation | Runners et Rules | Extension API |

JUnit 4 :

```java
import org.junit.Test;
import static org.junit.Assert.assertEquals;
```

JUnit 5 :

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
```

## 8. Architecture de JUnit 5

```text
JUnit 5
    |
    +-- JUnit Platform
    |       +-- Découverte des tests
    |       +-- Exécution des tests
    |
    +-- JUnit Jupiter
    |       +-- API de test
    |       +-- Assertions
    |       +-- Extensions
    |
    +-- JUnit Vintage
            +-- Exécution de tests JUnit 3 / 4
```

JUnit Vintage nécessite des dépendances adaptées.

## 9. Installer JUnit 4 sans Maven

Utiliser Java 8, JUnit 4.13.2 et Hamcrest Core 1.3.

Téléchargements :

- [junit-4.13.2.jar](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [hamcrest-core-1.3.jar](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Arborescence :

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

## 10. Classe à tester

Fichier `src/Media.java` :

```java
public class Media {

    public boolean isMovie(int duration) {
        return duration >= 60;
    }
}
```

## 11. Tests unitaires

Fichier `src/MediaTest.java` :

```java
import org.junit.Test;
import static org.junit.Assert.*;

public class MediaTest {

    @Test
    public void shouldReturnTrueForMovie() {
        Media media = new Media();
        boolean result = media.isMovie(120);
        assertTrue(result);
    }

    @Test
    public void shouldReturnFalseForShortMedia() {
        Media media = new Media();
        boolean result = media.isMovie(30);
        assertFalse(result);
    }

    @Test
    public void shouldAcceptSixtyMinutes() {
        Media media = new Media();
        assertTrue(media.isMovie(60));
    }
}
```

Chaque méthode annotée avec `@Test` représente un test. Une assertion incorrecte provoque un échec.

## 12. Compiler sans Maven

Créer d'abord le répertoire `build` :

```bash
mkdir build
```

Windows :

```bat
javac -cp "lib/*" -d build src\Media.java src\MediaTest.java
```

Linux / macOS :

```bash
javac -cp "lib/*" -d build src/Media.java src/MediaTest.java
```

`-cp` désigne le classpath ; `-d build` définit le répertoire de sortie des fichiers `.class`.

```text
build/
├── Media.class
└── MediaTest.class
```

## 13. Exécuter JUnit

JUnit 4 fournit le lanceur `org.junit.runner.JUnitCore`.

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore MediaTest
```

Linux / macOS :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore MediaTest
```

Le séparateur du classpath est `;` sur Windows et `:` sur Linux/macOS.

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
...
Time: 0.01

OK (3 tests)
```

## 14. Exemple d'échec

Ajouter ce test à `MediaTest.java` :

```java
@Test
public void shouldFail() {
    Media media = new Media();
    assertTrue(media.isMovie(30));
}
```

Il échoue parce que `isMovie(30)` retourne `false` :

```text
There was 1 failure:
1) shouldFail(MediaTest)
java.lang.AssertionError

FAILURES!!!
Tests run: 4, Failures: 1
```

## 15. Assertions JUnit 4

| Assertion | Vérification |
|---|---|
| `assertEquals` | Valeurs égales |
| `assertNotEquals` | Valeurs différentes |
| `assertTrue` | Expression vraie |
| `assertFalse` | Expression fausse |
| `assertNull` | Valeur nulle |
| `assertNotNull` | Valeur non nulle |
| `assertSame` | Même référence objet |
| `assertArrayEquals` | Égalité des tableaux |
| `fail` | Échec explicite |

```java
import org.junit.Test;
import static org.junit.Assert.*;

public class AssertionsTest {

    @Test
    public void testAssertions() {
        assertEquals(120, 120);
        assertNotEquals(120, 90);
        assertTrue(120 > 60);
        assertFalse(30 > 60);
        assertNull(null);
        assertNotNull("Interstellar");
    }
}
```

## 16. Cycle de vie des tests

| Annotation | Moment |
|---|---|
| `@BeforeClass` | Une fois avant tous les tests |
| `@Before` | Avant chaque test |
| `@Test` | Test |
| `@After` | Après chaque test |
| `@AfterClass` | Une fois après tous les tests |

```java
import org.junit.*;

public class MediaLifecycleTest {

    @Before
    public void setUp() {
        System.out.println("Initialisation");
    }

    @Test
    public void testMovie() {
        System.out.println("Test");
    }

    @After
    public void tearDown() {
        System.out.println("Nettoyage");
    }
}
```

## 17. JUnit avec IntelliJ IDEA

1. Ouvrir le projet dans IntelliJ IDEA.
2. Vérifier que le SDK est Java 8.
3. Ajouter les deux JAR via `Project Structure > Modules > Dependencies`.
4. Créer `MediaTest.java`.
5. Ajouter les annotations `@Test`.
6. Cliquer sur le bouton d'exécution à côté de la classe ou des méthodes.

IntelliJ affiche les tests réussis, échoués et les messages d'erreur.

## 18. Bonnes pratiques : unitaire et intégration

| Critère | Test unitaire | Test d'intégration |
|---|---|---|
| Périmètre | Une unité de code | Plusieurs composants |
| Dépendances externes | Généralement isolées | Souvent réelles |
| Durée | Généralement courte | Potentiellement plus longue |
| Exemple | Validation d'une durée | Émetteur et récepteur UDP |
| Objectif | Vérifier une règle | Vérifier l'interaction |

Pour Java UDP/TCP et protocoles binaires :

1. Tester séparément l'encodage et le décodage.
2. Tester les cas limites et les erreurs.
3. Tester la communication réelle entre émetteur et récepteur.
4. Ajouter des tests d'intégration sur les scénarios complets.

Un test réseau doit prévoir des délais d'expiration, éviter les attentes infinies et fermer les sockets.

## 19. À retenir

- JUnit automatise les tests.
- Un test unitaire vérifie une unité isolée.
- Un test d'intégration vérifie plusieurs composants ensemble.
- JUnit 4.13.2 est un bon premier choix pour Java 8 sans Maven.
- Des versions de JUnit 5 sont également compatibles Java 8.
- JUnit 6 nécessite Java 17.
- JUnit fonctionne en ligne de commande et dans IntelliJ.

## 20. Sources

- [JUnit 4](https://github.com/junit-team/junit4)
- [JUnit 4 : Getting Started](https://github.com/junit-team/junit4/wiki/getting-started)
- [Documentation JUnit 5](https://docs.junit.org/5.14.1/user-guide/)
- [Documentation JUnit actuelle](https://docs.junit.org/current/user-guide/)
- [Maven Central](https://central.sonatype.com/)
