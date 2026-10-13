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

## Exceptions et erreurs courantes en Java 8

| Exception / Erreur | Description |
|---|---|
| `NullPointerException` | Utilisation d'une référence `null` |
| `ArithmeticException` | Opération arithmétique invalide, comme une division entière par zéro |
| `NumberFormatException` | Conversion impossible d'une chaîne en nombre |
| `ArrayIndexOutOfBoundsException` | Index hors limites d'un tableau |
| `IndexOutOfBoundsException` | Index hors limites d'une collection ou séquence |
| `StringIndexOutOfBoundsException` | Index incorrect dans une chaîne |
| `ClassCastException` | Conversion incompatible entre types d'objets |
| `IllegalArgumentException` | Argument invalide transmis à une méthode |
| `IllegalStateException` | Opération interdite dans l'état actuel de l'objet |
| `UnsupportedOperationException` | Opération non prise en charge |
| `NegativeArraySizeException` | Taille négative utilisée pour créer un tableau |
| `SecurityException` | Opération refusée par les contrôles de sécurité |
| `IOException` | Erreur d'entrée/sortie |
| `FileNotFoundException` | Fichier introuvable ou inaccessible |
| `EOFException` | Fin de fichier ou de flux inattendue |
| `SocketException` | Erreur liée à une socket réseau |
| `SocketTimeoutException` | Délai réseau dépassé |
| `UnknownHostException` | Nom d'hôte non résolu |
| `ConnectException` | Échec d'établissement d'une connexion |
| `BindException` | Impossible d'associer une socket à une adresse ou un port |
| `InterruptedException` | Thread interrompu pendant une opération bloquante |
| `ClassNotFoundException` | Classe introuvable lors d'un chargement dynamique |
| `SQLException` | Erreur d'accès à une base de données |
| `ParseException` | Erreur d'analyse d'une valeur |
| `TimeoutException` | Opération asynchrone ayant dépassé le délai autorisé |
| `ExecutionException` | Échec d'une tâche exécutée de manière asynchrone |
| `NoSuchMethodException` | Méthode introuvable par réflexion |
| `NoSuchFieldException` | Champ introuvable par réflexion |
| `OutOfMemoryError` | Mémoire insuffisante pour la JVM |
| `StackOverflowError` | Dépassement de la pile d'exécution |
| `NoClassDefFoundError` | Classe nécessaire introuvable au chargement ou à l'initialisation |
| `NoSuchMethodError` | Méthode attendue absente à l'exécution |
| `UnsupportedClassVersionError` | Bytecode compilé pour une version Java non prise en charge |
| `ExceptionInInitializerError` | Échec de l'initialisation statique d'une classe |
| `AssertionError` | Assertion Java échouée |

Ce tableau recense les exceptions et erreurs les plus courantes, sans prétendre être exhaustif. Les classes dérivées de `Error` représentent généralement des problèmes graves qu'on ne cherche pas à intercepter lors du fonctionnement normal.
