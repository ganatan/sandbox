# TimerTask Java 8

## Principe

`TimerTask` est une classe abstraite qui définit une tâche à exécuter par un `Timer`.

La méthode `run()` contient le traitement à effectuer.

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

        timer.schedule(task, 0, 2000);
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

## Commandes essentielles

```java
TimerTask task = new TimerTask() {
    public void run() {
        System.out.println("Christopher Nolan");
    }
};
```

- `TimerTask` : définit la tâche.
- `run()` : contient le traitement.
- `timer.schedule(task, 0, 2000)` : exécute la tâche immédiatement, puis environ toutes les 2 secondes.
- `task.cancel()` : annule les futures exécutions de cette tâche.
