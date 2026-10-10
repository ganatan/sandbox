# Java 8 - Exécution d'un Bash toutes les 10 secondes

## Principe

Créer une application Java 8 qui lance automatiquement un script Bash sous Linux toutes les 10 secondes.

- Java 8
- Linux
- Sans Maven
- Sans bibliothèque externe
- Intervalle : 10 secondes
- Planification : `ScheduledExecutorService`
- Exécution Bash : `ProcessBuilder`

## Structure du projet

```text
java-bash-scheduler/
├── src/
│   └── Main.java
├── scripts/
│   └── media.sh
└── build/
```

## scripts/media.sh

```bash
#!/bin/bash

echo "Exécution Bash : $(date)"
echo "Film : Interstellar"
```

## Main.java

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {

        ScheduledExecutorService scheduler =
            Executors.newSingleThreadScheduledExecutor();

        scheduler.scheduleWithFixedDelay(() -> {

            try {
                executeBash();
            } catch (Exception e) {
                System.err.println("Erreur : " + e.getMessage());
            }

        }, 0, 10, TimeUnit.SECONDS);
    }

    private static void executeBash() throws Exception {

        ProcessBuilder builder = new ProcessBuilder(
            "bash",
            "scripts/media.sh"
        );

        builder.redirectErrorStream(true);

        Process process = builder.start();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                    process.getInputStream(),
                    StandardCharsets.UTF_8
                ))) {

            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        }

        int exitCode = process.waitFor();

        System.out.println("Code retour : " + exitCode);
    }
}
```

## Compilation Linux

Depuis la racine du projet :

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
Exécution Bash : Sat Oct 10 17:30:00 CEST 2026
Film : Interstellar
Code retour : 0

Exécution Bash : Sat Oct 10 17:30:10 CEST 2026
Film : Interstellar
Code retour : 0

Exécution Bash : Sat Oct 10 17:30:20 CEST 2026
Film : Interstellar
Code retour : 0
```

Les dates et heures affichées dépendent de l'exécution réelle.

## Modifier l'intervalle

Toutes les 5 secondes :

```java
}, 0, 5, TimeUnit.SECONDS);
```

Toutes les 30 secondes :

```java
}, 0, 30, TimeUnit.SECONDS);
```

## Exécuter un autre script

```java
ProcessBuilder builder = new ProcessBuilder(
    "bash",
    "scripts/backup.sh"
);
```

## Rendre le script exécutable

Facultatif lorsque le script est lancé explicitement avec `bash` :

```bash
chmod +x scripts/media.sh
```

## Exécuter le Bash manuellement

```bash
bash scripts/media.sh
```

## Vérifier le processus Java

```bash
ps aux | grep java
```

## Arrêter l'application

```text
Ctrl + C
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `ScheduledExecutorService` | Planifier les exécutions |
| `Executors` | Créer le scheduler |
| `TimeUnit` | Définir l'intervalle |
| `ProcessBuilder` | Lancer le script Bash |
| `Process` | Représenter le processus Linux |
| `BufferedReader` | Lire la sortie du Bash |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `scheduleWithFixedDelay()` | Planifier les répétitions |
| `builder.start()` | Démarrer le processus Bash |
| `getInputStream()` | Récupérer la sortie console |
| `readLine()` | Lire une ligne |
| `waitFor()` | Attendre la fin du processus |
| `exitValue()` | Obtenir le code retour d'un processus terminé |

## Différence entre interval et cron

| Type | Fonctionnement |
|---|---|
| `scheduleAtFixedRate()` | Cadence fixe |
| `scheduleWithFixedDelay()` | Délai après la fin de la tâche |
| Cron Linux | Planification à la minute ou selon un calendrier |
| `ProcessBuilder` | Exécution d'un programme externe |

## À retenir

- Java lance un processus Bash avec un délai de 10 secondes après la fin du précédent.
- `ProcessBuilder` permet d'exécuter des programmes externes.
- Le script s'exécute avec les permissions de l'utilisateur qui lance Java.
- `waitFor()` attend la fin du processus Bash.
- Le code retour `0` indique généralement une exécution réussie.
- Les sorties standard et d'erreur sont affichées dans la console Java.
- Les exécutions ne se chevauchent pas dans cet exemple.
- Si le Bash dure 3 secondes, le prochain lancement intervient environ 13 secondes après le précédent.
- Les chemins relatifs sont résolus depuis le répertoire de travail du processus Java.
- L'application doit rester démarrée pour continuer la planification.
