# Test unitaire avec Mockito

## 1. Objectif

Tester une classe Java qui utilise une dépendance externe, sans exécuter réellement cette dépendance.

Environnement :

- Java 8
- JUnit 4.13.2
- Mockito 3.12.4
- Sans Maven
- Sans Gradle

## 2. Principe

Notre application possède deux classes :

- `MediaRepository` : recherche le titre d'un film.
- `MediaService` : utilise le repository pour récupérer ce titre.

```text
MediaService
     |
     v
MediaRepository
     |
     v
Titre du film
```

Lors du test, Mockito remplace le véritable repository par un objet simulé appelé `mock`.

```text
MediaService
     |
     v
Mock MediaRepository
     |
     v
Réponse simulée
```

Cela permet de tester uniquement `MediaService`.

## 3. Arborescence

```text
java-mockito/
├── lib/
│   ├── junit-4.13.2.jar
│   ├── hamcrest-core-1.3.jar
│   ├── mockito-core-3.12.4.jar
│   ├── byte-buddy-1.11.13.jar
│   ├── byte-buddy-agent-1.11.13.jar
│   └── objenesis-3.2.jar
├── src/
│   ├── MediaRepository.java
│   ├── MediaService.java
│   └── MediaServiceTest.java
└── build/
```

## 4. Classe MediaRepository.java

Créer `src/MediaRepository.java`.

```java
public class MediaRepository {

    public String findTitle(int id) {
        return "Interstellar";
    }
}
```

Pour simplifier, notre repository retourne toujours le même titre.

Dans une application réelle, cette classe pourrait accéder à une base de données ou appeler une API.

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
}
```

Le repository est fourni au constructeur. C'est le principe de l'injection de dépendances.

## 6. Classe MediaServiceTest.java

Créer `src/MediaServiceTest.java`.

```java
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class MediaServiceTest {

    @Test
    public void testGetTitle() {

        MediaRepository repository = mock(MediaRepository.class);

        when(repository.findTitle(1)).thenReturn("Inception");

        MediaService service = new MediaService(repository);

        String result = service.getTitle(1);

        assertEquals("Inception", result);

        verify(repository).findTitle(1);
    }
}
```

## 7. Explications

| Élément | Rôle |
|---|---|
| `mock()` | Crée une dépendance simulée |
| `when()` | Définit le comportement attendu |
| `thenReturn()` | Définit la valeur retournée |
| `assertEquals()` | Vérifie le résultat |
| `verify()` | Vérifie qu'une méthode a été appelée |

### Création du mock

```java
MediaRepository repository = mock(MediaRepository.class);
```

### Configuration du comportement

```java
when(repository.findTitle(1)).thenReturn("Inception");
```

La véritable méthode `findTitle()` du repository n'est pas exécutée.

### Vérification du résultat

```java
assertEquals("Inception", result);
```

### Vérification de l'appel

```java
verify(repository).findTitle(1);
```

Mockito vérifie que le service a appelé `findTitle(1)` exactement une fois.

## 8. Installation des bibliothèques

Télécharger les six fichiers JAR :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)
- [Mockito Core 3.12.4](https://repo.maven.apache.org/maven2/org/mockito/mockito-core/3.12.4/mockito-core-3.12.4.jar)
- [Byte Buddy 1.11.13](https://repo.maven.apache.org/maven2/net/bytebuddy/byte-buddy/1.11.13/byte-buddy-1.11.13.jar)
- [Byte Buddy Agent 1.11.13](https://repo.maven.apache.org/maven2/net/bytebuddy/byte-buddy-agent/1.11.13/byte-buddy-agent-1.11.13.jar)
- [Objenesis 3.2](https://repo.maven.apache.org/maven2/org/objenesis/objenesis/3.2/objenesis-3.2.jar)

Placer tous les fichiers dans le répertoire `lib`.

## 9. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\MediaRepository.java src\MediaService.java src\MediaServiceTest.java
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/*.java
```

## 10. Exécution

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore MediaServiceTest
```

Linux :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore MediaServiceTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
.
Time: 0.5

OK (1 test)
```

## 11. Tester plusieurs comportements

Ajouter un deuxième test dans `MediaServiceTest.java`.

```java
@Test
public void testUnknownMedia() {

    MediaRepository repository = mock(MediaRepository.class);

    when(repository.findTitle(999)).thenReturn(null);

    MediaService service = new MediaService(repository);

    String result = service.getTitle(999);

    assertEquals(null, result);

    verify(repository).findTitle(999);
}
```

Après ajout, JUnit doit indiquer :

```text
OK (2 tests)
```

## 12. Mock et objet réel

| Objet réel | Mock |
|---|---|
| Exécute le vrai code | Simule le comportement |
| Peut accéder à une base | Aucun accès réel |
| Peut appeler une API | Réponse prédéfinie |
| Dépend de l'environnement | Fonctionne isolément |
| Adapté aux tests d'intégration | Adapté aux tests unitaires |

## 13. À retenir

- Mockito permet de simuler les dépendances.
- `mock()` crée un objet simulé.
- `when().thenReturn()` définit une réponse.
- `verify()` contrôle les interactions.
- Mockito s'utilise avec JUnit.
- L'injection par constructeur facilite les tests.
- Un mock permet de tester une classe sans exécuter ses dépendances réelles.
