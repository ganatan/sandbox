# Timer Java 8

## Principe

`Timer` permet d'exécuter automatiquement une tâche à intervalles réguliers.

`TimerTask` définit le traitement à exécuter.

## Main.java

```java
import java.util.Timer;
import java.util.TimerTask;

public class Main {
    public static void main(String[] args) {
        Timer timer = new Timer();

        TimerTask task = new TimerTask() {
            public void run() {
                System.out.println("Christopher Nolan");
            }
        };

        timer.scheduleAtFixedRate(task, 0, 2000);
    }
}
```

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## Résultat

```text
Christopher Nolan
Christopher Nolan
Christopher Nolan
...
```

Un affichage toutes les 2 secondes.

Arrêter avec `Ctrl + C`.

## Commande essentielle

```java
timer.scheduleAtFixedRate(task, 0, 2000);
```

- `task` : tâche à exécuter.
- `0` : démarrage immédiat.
- `2000` : répétition toutes les 2 secondes.
- `TimerTask.run()` : traitement exécuté à chaque déclenchement.
