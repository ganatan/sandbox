# Héritage et polymorphisme Java 8

## Principe

La programmation orientée objet (POO) repose notamment sur quatre concepts :

- **Encapsulation** : protéger les attributs avec `private` et utiliser des getters/setters.
- **Héritage** : réutiliser les propriétés et méthodes d'une classe avec `extends`.
- **Polymorphisme** : manipuler plusieurs types d'objets à travers une classe commune.
- **Abstraction** : exposer les fonctionnalités utiles sans dévoiler les détails de leur implémentation.

## Media.java

Classe parent.

```java
public class Media {
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void afficher() {
        System.out.println("Media : " + title);
    }
}
```

## Movie.java

Classe enfant qui hérite de `Media`.

```java
public class Movie extends Media {
    private int year;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Override
    public void afficher() {
        System.out.println("Film : " + getTitle() + " (" + year + ")");
    }
}
```

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        Movie movie = new Movie();

        movie.setTitle("Interstellar");
        movie.setYear(2014);

        movie.afficher();

        Media media = movie;
        media.afficher();
    }
}
```

## Résultat

```text
Film : Interstellar (2014)
Film : Interstellar (2014)
```

## Concepts essentiels

### 1. Héritage — extends

```java
public class Movie extends Media {
}
```

`Movie` hérite des méthodes publiques de `Media`, notamment `getTitle()` et `setTitle()`.

### 2. Encapsulation — private

```java
private String title;
```

L'attribut est privé. On y accède depuis l'extérieur via les getters et setters.

### 3. Polymorphisme

```java
Media media = new Movie();
```

Une référence de type `Media` peut désigner un objet `Movie`.

Java exécute la méthode `afficher()` correspondant au type réel de l'objet.

### 4. Redéfinition — @Override

```java
@Override
public void afficher() {
    System.out.println("Film : " + getTitle());
}
```

`Movie` redéfinit une méthode héritée de `Media`.

### 5. Abstraction

```java
Media media = new Movie();
media.afficher();
```

Le code appelant utilise l'interface publique de `Media` sans avoir besoin de connaître les détails de l'implémentation.

Ici, il s'agit d'une abstraction par la classe parent, et non d'une classe déclarée avec `abstract`.

## Compilation

```bash
javac Main.java Media.java Movie.java
```

## Exécution

```bash
java Main
```

## À retenir

- `class` : définit une classe.
- `extends` : permet l'héritage.
- `private` : protège les attributs.
- `public` : rend les méthodes accessibles.
- `@Override` : indique la redéfinition d'une méthode.
- `super` : permet d'accéder aux constructeurs et méthodes de la classe parent.
- `Media media = new Movie()` : illustre le polymorphisme.

Java 8 autorise l'héritage d'une seule classe parent directe, mais une classe peut implémenter plusieurs interfaces.
