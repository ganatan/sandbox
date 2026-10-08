# Opérateurs logiques Java 8

## Principe

Les opérateurs logiques permettent de combiner ou d'inverser des conditions.

- `&&` : ET logique.
- `||` : OU logique.
- `!` : NON logique.

Ils retournent une valeur `boolean` : `true` ou `false`.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        String realisateur = "Christopher Nolan";
        int annee = 2026;
        boolean disponible = true;

        if (realisateur.equals("Christopher Nolan") && disponible) {
            System.out.println("Film disponible");
        }

        if (annee == 2026 || annee == 2025) {
            System.out.println("Film récent");
        }

        if (!disponible) {
            System.out.println("Film indisponible");
        }
    }
}
```

## Résultat

```text
Film disponible
Film récent
```

## Commandes essentielles

### 1. ET logique — &&

Toutes les conditions doivent être vraies.

```java
int annee = 2026;
boolean disponible = true;

if (annee == 2026 && disponible) {
    System.out.println("Film disponible en 2026");
}
```

### 2. OU logique — ||

Au moins une condition doit être vraie.

```java
String realisateur = "Christopher Nolan";

if (realisateur.equals("Christopher Nolan") || realisateur.equals("Steven Spielberg")) {
    System.out.println("Réalisateur reconnu");
}
```

### 3. NON logique — !

Inverse une condition.

```java
boolean disponible = false;

if (!disponible) {
    System.out.println("Film indisponible");
}
```

### 4. Plusieurs conditions

```java
int annee = 2026;
boolean disponible = true;
boolean favoris = false;

if (annee >= 2020 && (disponible || favoris)) {
    System.out.println("Film sélectionné");
}
```

### 5. Comparaison et logique

```java
int duree = 148;

if (duree >= 90 && duree <= 180) {
    System.out.println("Durée acceptée");
}
```

### 6. Vérification null

```java
String realisateur = null;

if (realisateur != null && !realisateur.isEmpty()) {
    System.out.println(realisateur);
}
```

Grâce à `&&`, Java ne vérifie pas `isEmpty()` lorsque `realisateur` vaut `null`.

## Tableau logique

| A | B | A && B | A \|\| B |
|---|---|---|---|
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## À retenir

- `&&` : toutes les conditions doivent être vraies.
- `||` : au moins une condition doit être vraie.
- `!` : inverse une valeur booléenne.
- `==` : compare les valeurs primitives.
- `!=` : vérifie une différence.
- `equals()` : compare le contenu des chaînes.
- `()` : permet de regrouper les conditions.

Avec `&&` et `||`, Java utilise une évaluation court-circuit : la seconde condition n'est pas évaluée si la première suffit à déterminer le résultat.

Tous les exemples sont compatibles **Java 8**.
