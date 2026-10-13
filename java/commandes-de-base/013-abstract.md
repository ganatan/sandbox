# Abstract

## Principe

En Java 8, le mot-clé `abstract` permet de définir une classe ou une méthode abstraite.

Une classe abstraite sert de base commune à des classes spécialisées. Elle ne peut pas être instanciée directement.

Une méthode abstraite n'a pas de corps. Toute classe concrète qui en hérite doit l'implémenter, sauf si une classe parente l'a déjà fait.

## Exemple complet

### Media.java

```java
public abstract class Media {

    private String title;

    public Media(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void displayTitle() {
        System.out.println(title);
    }

    public abstract void play();
}
```

### Movie.java

```java
public class Movie extends Media {

    public Movie(String title) {
        super(title);
    }

    @Override
    public void play() {
        System.out.println("Lecture du film : " + getTitle());
    }
}
```

### Series.java

```java
public class Series extends Media {

    public Series(String title) {
        super(title);
    }

    @Override
    public void play() {
        System.out.println("Lecture de la série : " + getTitle());
    }
}
```

### Main.java

```java
public class Main {

    public static void main(String[] args) {

        Media movie = new Movie("Interstellar");
        Media series = new Series("Breaking Bad");

        movie.displayTitle();
        movie.play();

        series.displayTitle();
        series.play();
    }
}
```

## Compilation et exécution

```bash
javac -d build Media.java Movie.java Series.java Main.java
java -cp build Main
```

Résultat :

```text
Interstellar
Lecture du film : Interstellar
Breaking Bad
Lecture de la série : Breaking Bad
```

## Comprendre abstract

Une classe abstraite ne peut pas être instanciée directement.

Interdit :

```java
Media media = new Media("Interstellar");
```

Autorisé :

```java
Media media = new Movie("Interstellar");
```

Une méthode abstraite est déclarée sans implémentation :

```java
public abstract void play();
```

Une classe concrète fournit l'implémentation :

```java
@Override
public void play() {
    System.out.println("Lecture du film");
}
```

## Méthodes classiques et abstraites

| Méthode | Possède un corps | Implémentation nécessaire dans une sous-classe concrète |
|---|---|---|
| Classique | Oui | Non |
| Abstraite | Non | Oui, sauf si déjà implémentée par un parent |

Une classe abstraite peut également déclarer des attributs, des constructeurs et des méthodes statiques.

## Abstract et polymorphisme

```java
public class Main {

    public static void main(String[] args) {

        Media[] medias = {
            new Movie("Interstellar"),
            new Series("Breaking Bad"),
            new Movie("Alien")
        };

        for (Media media : medias) {
            media.play();
        }
    }
}
```

Résultat :

```text
Lecture du film : Interstellar
Lecture de la série : Breaking Bad
Lecture du film : Alien
```

Chaque objet utilise sa propre implémentation de `play()`. C'est le polymorphisme.

## Abstract ou interface ?

| Caractéristique | Classe abstraite | Interface (Java 8) |
|---|---|---|
| Instanciation directe | Non | Non |
| Constructeur | Oui | Non |
| Attributs d'instance | Oui | Non |
| Méthodes implémentées | Oui | Oui, avec default ou static |
| Méthodes abstraites | Oui | Oui |
| Héritage multiple | Non, pour les classes | Oui, plusieurs interfaces |

Une classe abstraite sert à partager un état et des comportements communs entre classes apparentées.

Une interface sert à définir des capacités ou un contrat que des classes différentes peuvent implémenter.

## À retenir

`abstract` permet de partager une structure commune tout en imposant certaines méthodes aux classes concrètes. Il est particulièrement utile en association avec l'héritage et le polymorphisme.
