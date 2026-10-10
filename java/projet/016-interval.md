# Java 8 - Interval

## Principe

Exécuter une fonction automatiquement à intervalle régulier.

- Java 8
- Sans Maven
- Sans bibliothèque externe
- Intervalle : 1000 ms
- Exécution répétée automatiquement

En JavaScript :

```javascript
setInterval(() => {
    console.log("Bonjour");
}, 1000);
```

En Java, on utilise `ScheduledExecutorService`.

## Structure du projet

```text
java-interval/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {

        ScheduledExecutorService scheduler =
            Executors.newSingleThreadScheduledExecutor();

        scheduler.scheduleAtFixedRate(() -> {

            System.out.println("Film : Interstellar");

        }, 0, 1, TimeUnit.SECONDS);
    }
}
```

## Compilation Windows

```bat
mkdir build
javac -d build src/Main.java
```

## Exécution Windows

```bat
java -cp build Main
```

## Compilation Linux

```bash
mkdir -p build
javac -d build src/Main.java
```

## Exécution Linux

```bash
java -cp build Main
```

## Résultat

```text
Film : Interstellar
Film : Interstellar
Film : Interstellar
Film : Interstellar
```

Une nouvelle exécution est planifiée toutes les secondes.

## Modifier l'intervalle

Toutes les 500 millisecondes :

```java
scheduler.scheduleAtFixedRate(() -> {

    System.out.println("Film : Interstellar");

}, 0, 500, TimeUnit.MILLISECONDS);
```

Toutes les 5 secondes :

```java
scheduler.scheduleAtFixedRate(() -> {

    System.out.println("Film : Interstellar");

}, 0, 5, TimeUnit.SECONDS);
```

## Exécuter une fonction

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {

        ScheduledExecutorService scheduler =
            Executors.newSingleThreadScheduledExecutor();

        scheduler.scheduleAtFixedRate(() -> {

            afficherFilm();

        }, 0, 1, TimeUnit.SECONDS);
    }

    public static void afficherFilm() {
        System.out.println("Film : Interstellar");
    }
}
```

## Différence entre les méthodes

| Méthode | Fonctionnement |
|---|---|
| `schedule()` | Exécution unique après un délai |
| `scheduleAtFixedRate()` | Exécution périodique à cadence fixe |
| `scheduleWithFixedDelay()` | Délai fixe entre la fin d'une exécution et le début de la suivante |
| `shutdown()` | Arrêt du scheduler |

## Exemple avec délai fixe

```java
scheduler.scheduleWithFixedDelay(() -> {

    afficherFilm();

}, 0, 1, TimeUnit.SECONDS);
```

Avec `scheduleWithFixedDelay()`, la seconde d'attente commence après la fin de l'exécution précédente.

Avec `scheduleAtFixedRate()`, Java essaie de respecter une cadence régulière, sans exécuter simultanément plusieurs occurrences d'une même tâche périodique.

## Arrêter l'application

```text
Ctrl + C
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `ScheduledExecutorService` | Planifier les exécutions |
| `Executors` | Créer le scheduler |
| `TimeUnit` | Définir les unités de temps |
| `Runnable` | Représenter la tâche exécutée |

## À retenir

- `ScheduledExecutorService` est disponible en Java 8.
- `scheduleAtFixedRate()` est l'équivalent pratique de `setInterval()`.
- `scheduleWithFixedDelay()` attend un délai après chaque exécution.
- Le premier paramètre temporel correspond au délai initial.
- Le deuxième correspond à la période ou au délai entre les exécutions.
- Le scheduler utilise ici un thread unique.
- Une exception non interceptée dans la tâche empêche ses futures exécutions périodiques.
- `shutdown()` permet d'arrêter proprement le scheduler.
