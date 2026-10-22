# Java 8 — Les génériques : E, T, K, V, ?, extends et super

Projet autonome Java 8 avec `Main`, Ant, JUnit 3 et des exemples proches d'un framework industriel. Le but est de comprendre **exactement** la déclaration `protected Map<Class<?>, StructTypeHome<?>> homes` et les méthodes `<E>`.

## 1. Arborescence

```text
java-ant-junit-generics/
├── src/com/ganatan/cinema/
│   ├── Main.java
│   ├── model/
│   │   ├── Media.java
│   │   └── Movie.java
│   └── generic/
│       ├── Box.java
│       ├── Pair.java
│       ├── StructTypeHome.java
│       ├── StructRegistry.java
│       └── GenericUtils.java
├── test/com/ganatan/cinema/GenericsTest.java
├── lib/junit.jar (à ajouter)
├── build.xml
└── dist/ (généré)
```

## 2. Prérequis et commandes

JDK **8**, **Apache Ant** et **JUnit 3.8.2** dans `lib/junit.jar` pour les tests. Pas de Maven ni de Gradle.

```bat
java -version
javac -version
ant -version
ant compile
ant run
ant test
ant jar
```

`ant all` lance tests et construction des livrables en une commande ; `ant clean` supprime `build` et `dist`.

```bat
java -jar dist/app.jar
```

`dist/` contient `app.jar`, son fichier `app.jar.MD5` et `app-install.zip`.

## 3. Pourquoi les génériques ?

Sans générique, une collection d'`Object` impose des conversions explicites et permet de mélanger involontairement les types. Avec `Box<E>`, le compilateur connaît le type :

```java
Box<String> title = new Box<String>("Alien");
String name = title.get();
Box<Integer> year = new Box<Integer>(1979);
Integer value = year.get();
```

La classe `Box<E>` déclare `E` au niveau **de la classe** :

```java
public class Box<E> {
    private E value;

    public Box(E value) {
        this.value = value;
    }

    public E get() {
        return value;
    }

    public void set(E value) {
        this.value = value;
    }
}
```

`E` n'est ni une classe prédéfinie ni un mot-clé : c'est un **nom de paramètre de type**. On pourrait écrire `<T>` à la place et obtenir le même comportement. Une fois `Box<String>` choisi, `set(123)` ne compile pas.

## 4. Que veulent dire T, E, K et V ?

| Notation | Convention | Exemple |
|---|---|---|
| `<T>` | Type quelconque | `<T> T first(List<T> values)` |
| `<E>` | Élément | `class Box<E>` |
| `<K>` | Clé | `Map<K, V>` |
| `<V>` | Valeur | `Map<K, V>` |
| `<K, V>` | Deux types différents | `Pair<String, Integer>` |

Les noms sont conventionnels, pas imposés par Java. Notre `Pair<K, V>` mémorise une clé et une valeur :

```java
Pair<String, Integer> film = new Pair<String, Integer>("Alien", 1979);
String title = film.getKey();
Integer year = film.getValue();
```

## 5. Les génériques de méthode : `<T>` ou `<E>`

Une méthode peut déclarer son propre type **avant le type de retour** :

```java
public static <T> T first(List<T> values) {
    if (values.isEmpty()) {
        return null;
    }
    return values.get(0);
}
```

```java
String s = GenericUtils.first(Arrays.asList("Alien", "Avatar"));
Integer n = GenericUtils.first(Arrays.asList(1979, 1982));
```

Ici, `<T>` **déclare** la variable de type et le `T` suivant est le type de retour. L'inférence du compilateur déduit `String` ou `Integer` suivant l'appel. Une méthode générique peut être définie dans une classe qui n'est pas elle-même générique.

## 6. Que signifie `?` ?

`?` est un **wildcard**, c'est-à-dire un type inconnu :

```java
List<?> values = Arrays.asList("Alien", "Avatar");
Object first = values.get(0);
```

On peut **lire** les éléments en tant qu'`Object`, mais on ne peut pas ajouter un `String` dans `List<?>` : le type concret pourrait être `List<Integer>`. L'ajout de `null` reste autorisé.

La méthode `printAll(List<?> values)` accepte `List<String>`, `List<Movie>`, `List<Integer>`, etc. Un wildcard n'est **pas équivalent** à `Object` : `List<String>` ne peut pas être passé à une méthode exigeant `List<Object>`.

## 7. `? extends Number` : lire plusieurs types numériques

```java
public static double sum(List<? extends Number> values) {
    double total = 0;
    for (Number value : values) {
        total += value.doubleValue();
    }
    return total;
}
```

`List<Integer>`, `List<Double>` ou `List<Number>` sont acceptées. On peut lire les éléments comme des `Number`, mais pas y insérer un `Integer` arbitraire (à l'exception de `null`). `extends` est ici une **borne supérieure**, valable également si la borne est une interface.

## 8. `? super Movie` : ajouter des Movie

```java
public static void addMovie(List<? super Movie> values, Movie movie) {
    values.add(movie);
}
```

Cette méthode accepte une `List<Movie>`, `List<Media>` ou `List<Object>`. On sait qu'il est sûr d'y écrire un `Movie`. En revanche, lors d'une lecture, on ne peut supposer que les éléments sont des `Movie` : on récupère seulement des `Object`.

**Règle pratique PECS : Producer Extends, Consumer Super.** Une source qui produit des données peut utiliser `extends` ; une destination qui reçoit des valeurs utilise `super`.

## 9. Décomposer `Map<Class<?>, StructTypeHome<?>>`

Le cœur du projet :

```java
protected final Map<Class<?>, StructTypeHome<?>> homes =
        new HashMap<Class<?>, StructTypeHome<?>>();
```

| Fragment | Signification |
|---|---|
| `protected` | Accessible dans le package et depuis les sous-classes (avec règles d'accès pour les autres packages) |
| `final` | Interdit de réaffecter la variable `homes`, mais pas de modifier la map |
| `Map<K, V>` | Associe une clé à une valeur |
| `Class<?>` | Objet représentant n'importe quelle classe Java |
| `StructTypeHome<?>` | Instance de `StructTypeHome` paramétrée par un type inconnu |
| `HashMap<...>` | Implémentation concrète de `Map` |

Exemple des entrées du registre :

```text
Clé String.class  -> StructTypeHome<String>("Alien")
Clé Integer.class -> StructTypeHome<Integer>(1979)
Clé Movie.class   -> StructTypeHome<Movie>(movie)
```

La valeur est un objet **`StructTypeHome<E>`** :

```java
public class StructTypeHome<E> {
    private final Class<E> type;
    private final E value;

    public StructTypeHome(Class<E> type, E value) {
        this.type = type;
        this.value = type.cast(value);
    }

    public E getValue() {
        return value;
    }
}
```

`Class<E>` apporte une information exploitable à l'exécution. `type.cast(value)` vérifie la compatibilité (pour les références non nulles) et réalise une conversion contrôlée par la classe demandée.

## 10. Registre : déclarer, enregistrer, retrouver

```java
public class StructRegistry {
    protected final Map<Class<?>, StructTypeHome<?>> homes =
        new HashMap<Class<?>, StructTypeHome<?>>();

    public <E> void register(Class<E> type, E value) {
        homes.put(type, new StructTypeHome<E>(type, value));
    }

    public <E> E find(Class<E> type) {
        StructTypeHome<?> home = homes.get(type);
        if (home == null) {
            return null;
        }
        return type.cast(home.getValue());
    }
}
```

Appels :

```java
StructRegistry registry = new StructRegistry();
registry.register(String.class, "Alien");
registry.register(Integer.class, 1979);
String film = registry.find(String.class);
Integer year = registry.find(Integer.class);
```

**Important :** la déclaration de la Map seule ne garantit pas que chaque valeur correspond à sa clé. C'est la méthode `register(Class<E>, E)` qui maintient cette relation, et la méthode `find` utilise `Class.cast` pour vérifier la valeur à la récupération. Un héritage qui modifie directement la `Map` protégée peut casser cet invariant ; pour une vraie API, préférer souvent une `Map` privée.

`getHome(Class<?>)` permet de récupérer `StructTypeHome<?>`, sans promettre un type `E` spécifique. La méthode `snapshot()` fournit une copie non modifiable de la Map actuelle : ce n'est pas une vue dynamique.

## 11. À ne pas confondre

```java
Class<?> anyClass = Movie.class;
Class<Movie> movieClass = Movie.class;
```

`Class<Movie>` connaît le type. `Class<?>` accepte toute classe sans conserver une précision statique sur son paramètre de type.

```java
List<Media> media = new ArrayList<Media>();
List<Movie> movies = new ArrayList<Movie>();
```

`Movie extends Media` **ne signifie pas** que `List<Movie> extends List<Media>` : les génériques Java sont invariants. Utiliser les wildcards pour exprimer les relations de lecture ou d'écriture.

Ne pas confondre également `<E>` avec un paramètre réel : dans `class Box<E>`, `E` est déclaré ; dans `Box<String>`, `String` est fourni.

## 12. Limitations techniques Java 8

- Les génériques fonctionnent principalement à la **compilation** ; Java applique l'**effacement de type** (*type erasure*).
- `new E()` et `new T[10]` sont interdits : le type générique n'est pas réifié.
- `List<String>` et `List<Integer>` partagent la même classe brute à l'exécution.
- Les types primitifs ne sont pas des paramètres génériques : utiliser `Integer`, pas `int`.
- Éviter les **raw types** comme `List list` ou `StructTypeHome home` : ils perdent les garanties de typage.
- Un cast non vérifié `(E) objet` peut produire des avertissements ; ici, `Class<E>.cast` évite un tel cast dans le registre.

## 13. IntelliJ et tests JUnit

1. Ouvrir le dossier du projet comme projet IntelliJ.
2. **Project Structure → Project** : sélectionner le **JDK 8**.
3. Marquer `src` comme **Sources Root**, et `test` comme **Test Sources Root**.
4. Copier **JUnit 3.8.2** sous `lib/junit.jar`.
5. Pour lancer `GenericsTest` avec le triangle vert, ajouter ce JAR dans **Modules → Dependencies**.
6. Lancer `ant run`, `ant test`, `ant jar`.

`GenericsTest` couvre les classes `Box`, `Pair`, le registre typé, la méthode générique, `extends` et `super`.

## 14. Résultat attendu de Main

```text
Film : Alien (1979)
Registry : Alien / 1979 / Alien
Wildcard ? : Alien
extends Number : 6.0
super Movie : 1
Element : Alien
Element : Blade Runner
Methode <T> : Alien
```

Ce mini-framework **n'est pas** une copie de `StructTypeHome` utilisé dans la mission : il démontre uniquement les syntaxes et le fonctionnement des génériques en Java 8.
