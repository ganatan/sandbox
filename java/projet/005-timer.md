# Timer Java 8

## Principe

`Timer` permet de programmer l'exécution d'un traitement à intervalles réguliers.

## Main.java

```java
import java.util.Timer;
import java.util.TimerTask;

public class Main {
    public static void main(String[] args) {
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            public void run() {
                System.out.println("Christopher Nolan");
            }
        }, 0, 2000);
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
Timer timer = new Timer();
```

- `Timer` : planifie les exécutions.
- `0` : démarrage immédiat.
- `2000` : répétition toutes les 2 secondes.

**Remarque :** `Timer` utilise obligatoirement une tâche de type `TimerTask`. Pour planifier sans `TimerTask`, utiliser `ScheduledExecutorService`.
