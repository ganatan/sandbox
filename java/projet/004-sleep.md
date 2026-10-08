# Sleep Java 8

## Principe

`Thread.sleep()` permet de mettre en pause l'exécution d'un thread pendant une durée définie en millisecondes.

## Main.java

```java
public class Main {
    public static void main(String[] args) throws Exception {
        while (true) {
            System.out.println("Christopher Nolan");
            Thread.sleep(2000);
        }
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
Thread.sleep(2000);
```

- `1000` : 1 seconde.
- `2000` : 2 secondes.
- `5000` : 5 secondes.
