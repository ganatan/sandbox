# Test d'intégration avec JUnit 4

## 1. Objectif

Vérifier que plusieurs classes Java fonctionnent correctement ensemble.

Environnement :

- Java 8
- JUnit 4.13.2
- Sans Mockito
- Sans Maven
- Sans Gradle

## 2. Principe

Un test unitaire vérifie une classe isolée. Un test d'intégration vérifie les interactions entre plusieurs composants réels.

```text
MediaService
     |
     v
MediaRepository
     |
     v
Liste des films
```

Le service utilise un véritable repository. Aucune dépendance n'est simulée.

## 3. Arborescence

```text
java-integration/
├── lib/
│   ├── junit-4.13.2.jar
│   └── hamcrest-core-1.3.jar
├── src/
│   ├── MediaRepository.java
│   ├── MediaService.java
│   └── MediaIntegrationTest.java
└── build/
```

## 4. Classe MediaRepository.java

Créer `src/MediaRepository.java`.

```java
import java.util.HashMap;
import java.util.Map;

public class MediaRepository {

    private final Map<Integer, String> medias = new HashMap<>();

    public MediaRepository() {
        medias.put(1, "Interstellar");
        medias.put(2, "Inception");
        medias.put(3, "Avatar");
    }

    public String findTitle(int id) {
        return medias.get(id);
    }
}
```

Le repository contient trois films en mémoire. Il ne dépend pas d'une base de données.

## 5. Classe MediaService.java

Créer `src/MediaService.java`.

```java
public class MediaService {

    private final MediaRepository repository;

    public MediaService(MediaRepository repository) {
        this.repository = repository;
    }

    public String getTitle(int id) {
        return repository.findTitle(id);
    }

    public boolean exists(int id) {
        return repository.findTitle(id) != null;
    }
}
```

| Méthode | Fonction |
|---|---|
| `getTitle()` | Récupère le titre d'un film |
| `exists()` | Vérifie si un film existe |

## 6. Classe MediaIntegrationTest.java

Créer `src/MediaIntegrationTest.java`.

```java
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class MediaIntegrationTest {

    private MediaRepository repository;
    private MediaService service;

    @Before
    public void setUp() {
        repository = new MediaRepository();
        service = new MediaService(repository);
    }

    @Test
    public void testGetTitle() {
        String result = service.getTitle(1);

        assertEquals("Interstellar", result);
    }

    @Test
    public void testMediaExists() {
        boolean result = service.exists(2);

        assertTrue(result);
    }

    @Test
    public void testMediaNotFound() {
        String result = service.getTitle(999);

        assertNull(result);
    }

    @Test
    public void testMediaDoesNotExist() {
        boolean result = service.exists(999);

        assertFalse(result);
    }
}
```

## 7. Explications

| Élément | Rôle |
|---|---|
| `@Before` | Initialise les objets avant chaque test |
| `@Test` | Identifie une méthode de test |
| `assertEquals()` | Compare deux valeurs |
| `assertTrue()` | Vérifie une condition vraie |
| `assertFalse()` | Vérifie une condition fausse |
| `assertNull()` | Vérifie une valeur nulle |

JUnit exécute cette méthode avant chaque test :

```java
@Before
public void setUp() {
    repository = new MediaRepository();
    service = new MediaService(repository);
}
```

Chaque test dispose de nouvelles instances.

```text
MediaIntegrationTest
        |
        v
MediaService.getTitle(1)
        |
        v
MediaRepository.findTitle(1)
        |
        v
"Interstellar"
```

Contrairement au tutoriel Mockito, le repository exécute son véritable code.

## 8. Installation de JUnit

Télécharger :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Placer les fichiers dans le répertoire `lib`.

## 9. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\MediaRepository.java src\MediaService.java src\MediaIntegrationTest.java
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/*.java
```

## 10. Exécution

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore MediaIntegrationTest
```

Linux :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore MediaIntegrationTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
....
Time: 0.01

OK (4 tests)
```

## 11. Provoquer un échec

Modifier volontairement `findTitle()` :

```java
public String findTitle(int id) {
    return null;
}
```

Relancer la compilation et les tests.

Deux tests échouent :

- `testGetTitle()` attend `"Interstellar"` et reçoit `null`.
- `testMediaExists()` attend `true` et reçoit `false`.

```text
FAILURES!!!
Tests run: 4, Failures: 2
```

## 12. Différence avec Mockito

| Critère | Test avec Mockito | Test d'intégration |
|---|---|---|
| Repository | Simulé | Réel |
| Service | Réel | Réel |
| Appel du repository | Intercepté | Exécuté |
| Données | Simulées | Présentes en mémoire |
| Framework | JUnit + Mockito | JUnit |
| Objectif | Isoler le service | Vérifier la collaboration |

Dans cet exemple, l'intégration reste limitée à deux classes en mémoire. Un test d'intégration plus complet pourrait utiliser une base de données, un serveur HTTP ou une communication UDP.

## 13. À retenir

- Un test d'intégration vérifie plusieurs composants ensemble.
- Les classes exécutent leur véritable code.
- `@Before` initialise les objets avant chaque test.
- JUnit permet de tester des interactions entre composants.
- Mockito n'est pas obligatoire pour les tests d'intégration.
- Les tests unitaires et les tests d'intégration sont complémentaires.
