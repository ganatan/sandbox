# Surcharge de constructeur Java 8

## Principe

Un constructeur permet d'initialiser un objet lors de sa création avec `new`.

La **surcharge de constructeur** consiste à définir plusieurs constructeurs dans une même classe, avec des paramètres différents.

- Le constructeur porte le même nom que la classe.
- Il n'a pas de type de retour, même pas `void`.
- Plusieurs constructeurs peuvent coexister.
- `this()` permet d'appeler un autre constructeur de la même classe.

## Media.java

```java
public class Media {
    private String title;
    private int year;

    public Media() {
        this("Inconnu", 0);
    }

    public Media(String title) {
        this(title, 0);
    }

    public Media(String title, int year) {
        this.title = title;
        this.year = year;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void afficher() {
        System.out.println(title + " (" + year + ")");
    }
}
```

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        Media media1 = new Media();
        Media media2 = new Media("Inception");
        Media media3 = new Media("Interstellar", 2014);

        media1.afficher();
        media2.afficher();
        media3.afficher();
    }
}
```

## Résultat

```text
Inconnu (0)
Inception (0)
Interstellar (2014)
```

## Concepts essentiels

### 1. Constructeur sans paramètre

```java
public Media() {
    this("Inconnu", 0);
}
```

Permet de créer un objet sans fournir de valeur.

```java
Media media = new Media();
```

### 2. Constructeur avec un paramètre

```java
public Media(String title) {
    this(title, 0);
}
```

Permet d'initialiser uniquement le titre.

```java
Media media = new Media("Inception");
```

### 3. Constructeur avec deux paramètres

```java
public Media(String title, int year) {
    this.title = title;
    this.year = year;
}
```

Permet d'initialiser le titre et l'année.

```java
Media media = new Media("Interstellar", 2014);
```

### 4. Surcharge

Les trois constructeurs portent le même nom mais possèdent des signatures différentes.

```java
Media()
Media(String title)
Media(String title, int year)
```

Java sélectionne le constructeur adapté aux arguments fournis.

### 5. this()

```java
public Media(String title) {
    this(title, 0);
}
```

`this()` appelle un autre constructeur de la classe.

Cet appel doit être la première instruction du constructeur en Java 8.

### 6. this.title

```java
this.title = title;
```

- `this.title` désigne l'attribut de l'objet.
- `title` désigne le paramètre du constructeur.

### 7. Constructeur parent — super()

Dans notre exemple précédent avec `Movie extends Media`, on peut appeler un constructeur de `Media` :

```java
public class Movie extends Media {
    public Movie(String title) {
        super(title);
    }
}
```

`super(title)` appelle le constructeur correspondant de la classe parent.

## Compilation

```bash
javac Main.java Media.java
```

## Exécution

```bash
java Main
```

## À retenir

- `new` : crée un objet et invoque un constructeur.
- `Media()` : constructeur sans paramètre.
- `Media(String title)` : constructeur avec un paramètre.
- `Media(String title, int year)` : constructeur avec deux paramètres.
- `this()` : appelle un autre constructeur de la même classe.
- `super()` : appelle un constructeur de la classe parent.
- `this.title` : désigne l'attribut de l'objet.
- La surcharge dépend du nombre, de l'ordre ou du type des paramètres.

**Attention :** si une classe déclare au moins un constructeur, Java ne génère plus automatiquement le constructeur sans argument.

Compatible **Java 8**, sans Maven ni dépendance externe.
