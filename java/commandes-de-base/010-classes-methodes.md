# Classes et méthodes Java 8

## Principe

Une classe permet de regrouper des variables et des méthodes.

- `private` : rend une variable inaccessible directement depuis une autre classe.
- `getTitle()` : getter permettant de lire une variable.
- `setTitle()` : setter permettant de modifier une variable.
- `void` : méthode sans valeur de retour.
- `String` : type de retour d'une méthode qui renvoie une chaîne.

## Media.java

```java
public class Media {
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return "Film : " + title;
    }

    public void afficher() {
        System.out.println("Film : " + title);
    }
}
```

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        Media media = new Media();

        media.setTitle("Interstellar");

        System.out.println(media.getTitle());
        System.out.println(media.getDescription());

        media.afficher();
    }
}
```

## Compilation

```bash
javac Main.java Media.java
```

## Exécution

```bash
java Main
```

## Résultat

```text
Interstellar
Film : Interstellar
Film : Interstellar
```

## Commandes essentielles

### 1. Création d'un objet

```java
Media media = new Media();
```

### 2. Getter

```java
String title = media.getTitle();
```

### 3. Setter

```java
media.setTitle("Inception");
```

### 4. Méthode avec retour

```java
public String getDescription() {
    return "Film : " + title;
}
```

`return` renvoie une valeur à la méthode appelante.

### 5. Méthode sans retour

```java
public void afficher() {
    System.out.println("Film : " + title);
}
```

`void` signifie que la méthode ne renvoie aucune valeur.

## À retenir

- `class` : définit une classe.
- `new` : crée un objet.
- `private` : protège l'accès aux attributs.
- `this.title` : désigne l'attribut de l'objet courant.
- `getTitle()` : récupère la valeur de `title`.
- `setTitle()` : modifie la valeur de `title`.
- `return` : renvoie une valeur.
- `void` : indique l'absence de valeur de retour.

Les deux fichiers doivent être placés dans le même répertoire pour cet exemple.

Compatible **Java 8**, sans dépendance externe.
