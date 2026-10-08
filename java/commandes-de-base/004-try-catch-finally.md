# Try Catch Finally Java 8

## Principe

`try`, `catch` et `finally` permettent de gérer les exceptions en Java.

- `try` : exécute le code susceptible de provoquer une erreur.
- `catch` : intercepte et traite une exception.
- `finally` : exécute un traitement à la fin, qu'une exception survienne ou non.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        try {
            String realisateur = null;
            System.out.println(realisateur.length());
        } catch (NullPointerException e) {
            System.out.println("Erreur : réalisateur null");
        } finally {
            System.out.println("Fin du traitement");
        }
    }
}
```

## Résultat

```text
Erreur : réalisateur null
Fin du traitement
```

## Commandes essentielles

### 1. Try Catch

```java
try {
    int resultat = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Division par zéro");
}
```

### 2. Plusieurs Catch

```java
try {
    String realisateur = null;
    System.out.println(realisateur.length());
} catch (NullPointerException e) {
    System.out.println("Valeur null");
} catch (Exception e) {
    System.out.println("Autre erreur");
}
```

### 3. Finally

```java
try {
    System.out.println("Traitement");
} finally {
    System.out.println("Fin");
}
```

### 4. Exception générique

```java
try {
    Integer.parseInt("Nolan");
} catch (Exception e) {
    System.out.println(e.getMessage());
}
```

### 5. Throw

```java
String realisateur = null;

if (realisateur == null) {
    throw new IllegalArgumentException("Réalisateur obligatoire");
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

- `try` : code à surveiller.
- `catch` : gestion des exceptions.
- `finally` : traitement final, notamment pour libérer des ressources.
- `throw` : déclenche une exception.
- `getMessage()` : récupère le message d'erreur.
- `printStackTrace()` : affiche la pile d'appels de l'exception.

`finally` s'exécute normalement même si une exception survient, mais son exécution n'est pas garantie si la JVM s'arrête brutalement.

Pour les fichiers et les sockets, privilégier `try-with-resources` lorsque la ressource implémente `AutoCloseable`.
