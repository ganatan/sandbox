# Throw Java 8

## Principe

`throw` permet de déclencher volontairement une exception lorsqu'une condition n'est pas respectée.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        String realisateur = null;

        if (realisateur == null) {
            throw new IllegalArgumentException("Réalisateur obligatoire");
        }

        System.out.println(realisateur);
    }
}
```

## Résultat

```text
Exception in thread "main" java.lang.IllegalArgumentException: Réalisateur obligatoire
```

## Commandes essentielles

### 1. Throw

```java
throw new IllegalArgumentException("Réalisateur obligatoire");
```

### 2. Throw avec condition

```java
String realisateur = "";

if (realisateur.isEmpty()) {
    throw new IllegalArgumentException("Réalisateur vide");
}
```

### 3. Throw avec Try Catch

```java
try {
    throw new IllegalArgumentException("Réalisateur invalide");
} catch (IllegalArgumentException e) {
    System.out.println(e.getMessage());
}
```

### 4. Throw avec NullPointerException

```java
String realisateur = null;

if (realisateur == null) {
    throw new NullPointerException("Réalisateur null");
}
```

### 5. Throw avec méthode

```java
public static void verifier(String realisateur) {
    if (realisateur == null) {
        throw new IllegalArgumentException("Réalisateur obligatoire");
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

## À retenir

- `throw` : déclenche une exception.
- `new` : crée une instance de l'exception.
- `IllegalArgumentException` : argument invalide.
- `NullPointerException` : référence null.
- `getMessage()` : récupère le message de l'exception.
- `catch` : permet d'intercepter l'exception.

`throw` déclenche une exception, tandis que `throws` déclare les exceptions qu'une méthode peut propager.
