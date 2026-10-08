# String Java 8

## Principe

`String` permet de représenter et de manipuler une chaîne de caractères.

Une chaîne `String` est immutable : son contenu ne peut pas être modifié après sa création.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        String realisateur = "Christopher Nolan";

        System.out.println(realisateur);
    }
}
```

## Commandes essentielles

### 1. Déclaration

```java
String realisateur = "Christopher Nolan";
```

### 2. Concaténation

```java
String prenom = "Christopher";
String nom = "Nolan";

String realisateur = prenom + " " + nom;
```

### 3. Longueur

```java
String realisateur = "Christopher Nolan";

System.out.println(realisateur.length());
```

### 4. Comparaison

```java
String realisateur = "Christopher Nolan";

System.out.println(realisateur.equals("Christopher Nolan"));
System.out.println(realisateur.equalsIgnoreCase("christopher nolan"));
```

Utiliser `equals()` et non `==` pour comparer le contenu de deux chaînes.

### 5. Recherche

```java
String realisateur = "Christopher Nolan";

System.out.println(realisateur.contains("Nolan"));
System.out.println(realisateur.startsWith("Christopher"));
System.out.println(realisateur.endsWith("Nolan"));
System.out.println(realisateur.indexOf("Nolan"));
```

### 6. Extraction

```java
String realisateur = "Christopher Nolan";

System.out.println(realisateur.substring(12));
System.out.println(realisateur.charAt(0));
```

### 7. Transformation

```java
String realisateur = "Christopher Nolan";

System.out.println(realisateur.toUpperCase());
System.out.println(realisateur.toLowerCase());
System.out.println(realisateur.replace("Nolan", "Spielberg"));
```

### 8. Suppression des espaces

```java
String realisateur = "  Christopher Nolan  ";

System.out.println(realisateur.trim());
```

### 9. Découpage

```java
String realisateurs = "Nolan,Spielberg,Cameron";

String[] noms = realisateurs.split(",");

for (String nom : noms) {
    System.out.println(nom);
}
```

### 10. Conversion

```java
int annee = 2026;

String texte = String.valueOf(annee);

int nombre = Integer.parseInt(texte);
```

### 11. Chaîne vide ou null

```java
String realisateur = "";

System.out.println(realisateur.isEmpty());
```

Pour éviter une `NullPointerException` :

```java
String realisateur = null;

if (realisateur != null && !realisateur.isEmpty()) {
    System.out.println(realisateur);
}
```

### 12. StringBuilder

Pour construire une chaîne avec plusieurs modifications :

```java
StringBuilder builder = new StringBuilder();

builder.append("Christopher");
builder.append(" ");
builder.append("Nolan");

System.out.println(builder.toString());
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

- `String` : chaîne de caractères immutable.
- `equals()` : comparaison du contenu.
- `length()` : longueur.
- `contains()` : recherche.
- `substring()` : extraction.
- `replace()` : remplacement.
- `split()` : découpage.
- `trim()` : suppression des espaces aux extrémités.
- `StringBuilder` : construction efficace de chaînes.

Toutes les méthodes présentées sont compatibles **Java 8**.
