# Java 8 - Cron

## Principe

Créer une application Java 8 qui exécute automatiquement une tâche tous les jours à 10h00.

- Java 8
- Sans Maven
- Sans bibliothèque externe
- Planification : tous les jours à 10h00
- API : `ScheduledExecutorService`

Équivalent cron Linux :

```text
0 10 * * *
```

## Structure du projet

```text
java-cron/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {

    private static final ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();

    public static void main(String[] args) {

        schedule();
    }

    private static void schedule() {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime next = now
            .withHour(10)
            .withMinute(0)
            .withSecond(0)
            .withNano(0);

        if (!next.isAfter(now)) {
            next = next.plusDays(1);
        }

        long delay = Duration.between(now, next).toMillis();

        System.out.println("Prochaine exécution : " + next);

        scheduler.schedule(() -> {

            try {
                execute();
            } finally {
                schedule();
            }

        }, delay, TimeUnit.MILLISECONDS);
    }

    private static void execute() {

        System.out.println(
            "Cron exécuté : " + LocalDateTime.now()
        );

        System.out.println("Film : Interstellar");
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

Exemple pour une application lancée avant 10h00 :

```text
Prochaine exécution : 2026-10-11T10:00
Cron exécuté : 2026-10-11T10:00:00.005
Film : Interstellar
Prochaine exécution : 2026-10-12T10:00
```

L'application reste active et planifie automatiquement l'exécution du lendemain.

## Modifier l'heure

Pour exécuter à 14h30 :

```java
LocalDateTime next = now
    .withHour(14)
    .withMinute(30)
    .withSecond(0)
    .withNano(0);
```

## Expressions cron courantes

| Expression | Signification |
|---|---|
| `* * * * *` | Toutes les minutes |
| `*/5 * * * *` | Toutes les 5 minutes |
| `0 * * * *` | Toutes les heures |
| `0 10 * * *` | Tous les jours à 10h00 |
| `30 14 * * *` | Tous les jours à 14h30 |
| `0 10 * * 1` | Chaque lundi à 10h00 |
| `0 0 1 * *` | Le premier jour de chaque mois |

Ces expressions décrivent la syntaxe cron Linux. Notre programme Java n'interprète pas directement ces expressions : il calcule uniquement une exécution quotidienne à l'heure configurée.

## Différence entre interval et cron

| Interval | Cron |
|---|---|
| Toutes les X secondes | À une heure planifiée |
| `scheduleAtFixedRate()` | `schedule()` |
| Cadence régulière | Calcul de la prochaine exécution |
| Exemple : toutes les 5 secondes | Exemple : tous les jours à 10h00 |

## Classes utilisées

| Classe | Utilité |
|---|---|
| `LocalDateTime` | Manipuler la date et l'heure |
| `Duration` | Calculer le délai |
| `ScheduledExecutorService` | Planifier une tâche |
| `Executors` | Créer le scheduler |
| `TimeUnit` | Définir les millisecondes |

## À retenir

- Java 8 ne possède pas de moteur cron natif.
- `ScheduledExecutorService` permet de planifier une exécution.
- `schedule()` exécute une tâche après un délai.
- Le programme recalcule la prochaine exécution après chaque tâche.
- L'application doit rester démarrée.
- Une application arrêtée ne rattrape pas automatiquement les exécutions manquées.
- Cet exemple utilise l'heure locale de la JVM et ne gère pas explicitement les changements d'heure.
- Pour interpréter de véritables expressions cron en Java, on peut utiliser une bibliothèque comme Quartz.
