# While Java 8

## Principe

`while` permet de répéter un traitement tant qu'une condition est vraie.

La condition est vérifiée avant chaque itération.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        String[] realisateurs = {
            "Christopher Nolan",
            "Steven Spielberg",
            "James Cameron"
        };

        int i = 0;

        while (i < realisateurs.length) {
            System.out.println(realisateurs[i]);
            i++;
        }
    }
}
```

## Résultat

```text
Christopher Nolan
Steven Spielberg
James Cameron
```

## Commandes essentielles

### 1. While simple

```java
int i = 0;

while (i < 3) {
    System.out.println("Christopher Nolan");
    i++;
}
```

### 2. While avec condition

```java
int annee = 2020;

while (annee <= 2026) {
    System.out.println("Année : " + annee);
    annee++;
}
```

### 3. While avec break

```java
int i = 0;

while (true) {
    System.out.println("Christopher Nolan");
    i++;

    if (i == 3) {
        break;
    }
}
```

### 4. While avec continue

```java
int i = 0;

while (i < 5) {
    i++;

    if (i == 3) {
        continue;
    }

    System.out.println("Film numéro : " + i);
}
```

### 5. While avec sleep

```java
int i = 0;

while (i < 3) {
    System.out.println("Christopher Nolan");
    Thread.sleep(2000);
    i++;
}
```

Cet exemple nécessite une méthode `main` déclarée avec `throws Exception`, comme dans notre tutoriel Sleep.

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## À retenir

- `while` : répète un traitement tant que la condition est vraie.
- `i++` : incrémente le compteur.
- `break` : quitte immédiatement la boucle.
- `continue` : passe à l'itération suivante.
- `while (true)` : crée une boucle infinie, sauf interruption explicite.
- `Thread.sleep()` : permet de temporiser les itérations.

**Attention :** une condition qui reste toujours vraie peut provoquer une boucle infinie.
