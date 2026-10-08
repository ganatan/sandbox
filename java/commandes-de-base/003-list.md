# List Java 8

## Principe

`List` permet de stocker plusieurs éléments dans une collection ordonnée.

- Les éléments sont accessibles par leur index.
- Les doublons sont autorisés.
- Les index commencent à `0`.
- `ArrayList` est une implémentation courante de `List`.

## Main.java

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> realisateurs = new ArrayList<>();

        realisateurs.add("Christopher Nolan");
        realisateurs.add("Steven Spielberg");
        realisateurs.add("James Cameron");

        System.out.println(realisateurs);
    }
}
```

## Commandes essentielles

### 1. Déclaration

```java
List<String> realisateurs = new ArrayList<>();
```

### 2. Ajout

```java
realisateurs.add("Christopher Nolan");
realisateurs.add("Steven Spielberg");
```

### 3. Accès à un élément

```java
System.out.println(realisateurs.get(0));
```

### 4. Taille

```java
System.out.println(realisateurs.size());
```

### 5. Modification

```java
realisateurs.set(0, "James Cameron");
```

### 6. Suppression

```java
realisateurs.remove(0);
realisateurs.remove("Steven Spielberg");
```

### 7. Recherche

```java
System.out.println(realisateurs.contains("Christopher Nolan"));
System.out.println(realisateurs.indexOf("Christopher Nolan"));
```

### 8. Parcours avec for

```java
for (int i = 0; i < realisateurs.size(); i++) {
    System.out.println(realisateurs.get(i));
}
```

### 9. Parcours avec for each

```java
for (String realisateur : realisateurs) {
    System.out.println(realisateur);
}
```

### 10. Parcours avec forEach Java 8

```java
realisateurs.forEach(realisateur -> System.out.println(realisateur));
```

### 11. Tri

```java
import java.util.Collections;

Collections.sort(realisateurs);
```

Ou avec Java 8 :

```java
realisateurs.sort(String::compareTo);
```

### 12. Filtrage avec Stream

```java
realisateurs.stream()
    .filter(realisateur -> realisateur.contains("Nolan"))
    .forEach(System.out::println);
```

### 13. Vérification liste vide

```java
System.out.println(realisateurs.isEmpty());
```

### 14. Suppression de tous les éléments

```java
realisateurs.clear();
```

### 15. Initialisation rapide

```java
import java.util.Arrays;

List<String> realisateurs = new ArrayList<>(
    Arrays.asList("Nolan", "Spielberg", "Cameron")
);
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

- `List` : interface représentant une collection ordonnée.
- `ArrayList` : implémentation courante.
- `add()` : ajout.
- `get()` : accès par index.
- `set()` : modification.
- `remove()` : suppression.
- `size()` : nombre d'éléments.
- `contains()` : recherche.
- `sort()` : tri.
- `forEach()` : parcours.
- `stream()` : traitement fonctionnel.
- `clear()` : suppression de tous les éléments.

Toutes les méthodes présentées sont compatibles **Java 8**.
