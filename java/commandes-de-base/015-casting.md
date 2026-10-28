# 015 - Casting en Java 8

## Définition

Un **cast** demande au compilateur de traiter une expression comme un autre type : `(Type) expression`. Distinguer la **conversion des primitives** et le **cast de références** : ce dernier ne transforme jamais l'objet réel.

## Primitives : implicite et explicite

```java
public class Main {
    public static void main(String[] args) {
        int a = 42;
        long b = a;
        double c = b;
        double d = 19.99;
        int e = (int) d;
        System.out.println(c);
        System.out.println(e);
    }
}
```

Un élargissement (`int -> long`) est implicite. Un rétrécissement (`double -> int`) demande généralement un cast, avec troncature ou perte de données. Attention : `long -> double` peut perdre de la précision, même sans cast. `boolean` ne se convertit pas en nombre.

## Upcasting et polymorphisme

```java
class Media {
    public String title() {
        return "Media";
    }
}

class Movie extends Media {
    @Override
    public String title() {
        return "Alien";
    }

    public void play() {
        System.out.println("Lecture");
    }
}

public class Main {
    public static void main(String[] args) {
        Movie movie = new Movie();
        Media media = movie;
        System.out.println(media.title());
    }
}
```

Affiche `Alien`. Un **upcast** sous-classe -> parent est implicite. L'implémentation d'une méthode redéfinie dépend de la classe réelle, mais l'accès aux méthodes dépend du type de la variable : `media.play()` ne compile pas.

## Downcasting contrôlé

```java
Media media = new Movie();
if (media instanceof Movie) {
    Movie movie = (Movie) media;
    movie.play();
}
```

En Java 8, `instanceof` ne déclare pas automatiquement une variable. Un downcast incompatible peut compiler mais produit `ClassCastException` à l'exécution :

```java
Media media = new Media();
Movie movie = (Movie) media;
```

`null instanceof Movie` vaut `false`. Un cast de `null` vers un type référence autorisé retourne `null`, mais une utilisation de cette référence peut produire `NullPointerException`.

## Cast d'interface

```java
interface Playable {
    void play();
}

class Movie implements Playable {
    public void play() {
        System.out.println("Lecture");
    }
}

public class Main {
    public static void main(String[] args) {
        Object value = new Movie();
        if (value instanceof Playable) {
            Playable player = (Playable) value;
            player.play();
        }
    }
}
```

Une référence peut être castée vers une interface uniquement lorsque l'objet réel est compatible.

## Object, String et conversion de valeur

```java
Object a = "Alien";
String title = (String) a;
Object b = Integer.valueOf(42);
String text = String.valueOf(b);
```

`(String) b` compilerait mais lèverait `ClassCastException` : caster une référence `Integer` ne crée pas une `String`.

## Cast, surcharge et redéfinition

```java
class Media {}
class Movie extends Media {}

public class Main {
    static void show(Media value) {
        System.out.println("Media");
    }

    static void show(Movie value) {
        System.out.println("Movie");
    }

    public static void main(String[] args) {
        Media value = new Movie();
        show(value);
        show((Movie) value);
    }
}
```

Affiche `Media`, puis `Movie`. La **surcharge** est résolue à la compilation à partir des types déclarés; la **redéfinition** est dispatchée selon l'objet réel.

## Héritage entre classes sœurs

Avec `Movie extends Media` et `Series extends Media`, une instance réelle de `Movie` ne peut pas être changée en `Series` par cast. Certaines conversions impossibles sont rejetées par le compilateur, d'autres échouent lors du contrôle à l'exécution.

## Génériques : invariance, wildcards et effacement

```java
import java.util.ArrayList;
import java.util.List;

class Media {}
class Movie extends Media {}

public class Main {
    public static void main(String[] args) {
        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie());
        List<? extends Media> readOnly = movies;
        Media item = readOnly.get(0);
        List<? super Movie> writable = new ArrayList<Media>();
        writable.add(new Movie());
        Object value = writable.get(0);
        System.out.println(item != null && value != null);
    }
}
```

`List<Movie>` n'est pas un sous-type de `List<Media>`. `? extends Media` autorise une lecture comme `Media` mais pas l'ajout arbitraire de `Media`; `? super Movie` accepte un `Movie` mais garantit seulement une lecture comme `Object`.

```java
Object source = new ArrayList<String>();
@SuppressWarnings("unchecked")
List<String> values = (List<String>) source;
```

Ce cast est **non vérifié** : à cause de l'effacement de type, la JVM ne vérifie pas `String` dans les paramètres de `List`. Un élément incorrect pourrait causer une `ClassCastException` plus tard. `instanceof List<String>` ne compile pas en Java 8; `instanceof List<?>` fonctionne.

## Tableaux : covariance et ArrayStoreException

```java
Object[] values = new String[2];
values[0] = "Alien";
```

`values[1] = Integer.valueOf(1)` compile mais produit `ArrayStoreException`, car le tableau réel est `String[]`.

```java
Object value = new String[] {"Alien"};
String[] titles = (String[]) value;
```

Le cast réussit; avec un tableau d'un autre type, il échoue.

## Wrappers : boxing, unboxing et conversion

```java
Object value = Integer.valueOf(42);
Integer integer = (Integer) value;
int primitive = integer;
Number number = integer;
long result = number.longValue();
```

`(Long) value` produit `ClassCastException`; utiliser `number.longValue()`. Déballer un wrapper `null` produit `NullPointerException`.

## Récapitulatif

| Cas | Cast ? | Résultat ou danger |
|---|---|---|
| `Movie -> Media` | Non | Upcasting |
| `Media -> Movie` | Oui | `ClassCastException` possible |
| `Object -> String` | Oui | Vérification à l'exécution |
| `Movie -> Playable` | Non si implémentée | Upcasting interface |
| `int -> long` | Non | Exact |
| `long -> double` | Non | Précision parfois perdue |
| `double -> int` | Oui | Troncature / saturation |
| `Integer -> Long` | Pas pour convertir | Passer par `Number.longValue()` |
| `List<?> -> List<String>` | Oui, non vérifié | Erreur différée possible |
| `Object -> String[]` | Oui | `ClassCastException` possible |

## Erreurs à connaître

- `ClassCastException` : référence incompatible.
- `ArrayStoreException` : insertion incompatible dans un tableau covariant.
- `NullPointerException` : déballage de `null` ou déréférencement de `null`.
- `incompatible types` : compilation impossible.
- `unchecked cast` : cast générique non vérifiable.

## Exécution

Pour chacun des exemples complets, enregistrer `Main.java` puis :

```bash
javac -source 8 -target 8 Main.java
java Main
```

Voir [016 - Conversions numériques](016-conversions-numeriques.md) pour les conversions entre tous les types numériques.
