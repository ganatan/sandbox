# Switch Java 8

## Principe

`switch` permet d'exécuter différents traitements selon la valeur d'une variable.

Il remplace plusieurs conditions `if / else if` lorsque l'on compare une même variable à différentes valeurs.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        String realisateur = "Nolan";

        switch (realisateur) {
            case "Nolan":
                System.out.println("Christopher Nolan");
                break;

            case "Spielberg":
                System.out.println("Steven Spielberg");
                break;

            case "Cameron":
                System.out.println("James Cameron");
                break;

            default:
                System.out.println("Réalisateur inconnu");
        }
    }
}
```

## Résultat

```text
Christopher Nolan
```

## Commandes essentielles

### 1. Switch

```java
switch (realisateur) {
    case "Nolan":
        System.out.println("Christopher Nolan");
        break;

    default:
        System.out.println("Réalisateur inconnu");
}
```

### 2. Plusieurs valeurs

```java
switch (realisateur) {
    case "Nolan":
    case "Spielberg":
        System.out.println("Réalisateur américain");
        break;

    default:
        System.out.println("Autre réalisateur");
}
```

### 3. Switch avec int

```java
int annee = 2026;

switch (annee) {
    case 2025:
        System.out.println("Année 2025");
        break;

    case 2026:
        System.out.println("Année 2026");
        break;

    default:
        System.out.println("Autre année");
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

## À retenir

- `switch` : sélectionne un traitement.
- `case` : définit une valeur à comparer.
- `break` : quitte le `switch`.
- `default` : traitement si aucun `case` ne correspond.
- Sans `break`, l'exécution continue dans les `case` suivants.

En Java 8, `switch` accepte notamment `int`, `String`, `char` et `enum`.

**Attention :** la syntaxe moderne `case "Nolan" ->` n'est pas compatible Java 8.
