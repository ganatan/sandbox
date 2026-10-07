# Commandes essentielles Java 8

## Affichage

```java
System.out.println("Hello");
System.out.print("Hello");
System.out.printf("Age : %d%n", 25);
```

## Variables

```java
int age = 25;
long distance = 1000L;
double prix = 19.99;
float taux = 1.5f;
boolean actif = true;
char lettre = 'A';
String nom = "Java";
```

## Constante

```java
final int MAX = 100;
```

## Conditions

```java
if (age >= 18) {
    System.out.println("Majeur");
} else if (age >= 16) {
    System.out.println("Presque majeur");
} else {
    System.out.println("Mineur");
}
```

## Switch

```java
switch (jour) {
    case 1:
        System.out.println("Lundi");
        break;
    case 2:
        System.out.println("Mardi");
        break;
    default:
        System.out.println("Autre");
}
```

## For

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

## For each

```java
for (String nom : noms) {
    System.out.println(nom);
}
```

## While

```java
int i = 0;

while (i < 10) {
    System.out.println(i);
    i++;
}
```

## Do while

```java
int i = 0;

do {
    System.out.println(i);
    i++;
} while (i < 10);
```

## Break et continue

```java
for (int i = 0; i < 10; i++) {
    if (i == 3) {
        continue;
    }

    if (i == 8) {
        break;
    }

    System.out.println(i);
}
```

## Tableau

```java
String[] noms = {"Alice", "Bob", "Charlie"};

System.out.println(noms[0]);
System.out.println(noms.length);
```

## List

```java
import java.util.ArrayList;
import java.util.List;

List<String> noms = new ArrayList<>();

noms.add("Alice");
noms.add("Bob");
noms.remove("Alice");

System.out.println(noms.get(0));
System.out.println(noms.size());
System.out.println(noms.contains("Bob"));
```

## Set

```java
import java.util.HashSet;
import java.util.Set;

Set<String> noms = new HashSet<>();

noms.add("Alice");
noms.add("Bob");

System.out.println(noms.contains("Alice"));
```

## Map

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> ages = new HashMap<>();

ages.put("Alice", 25);
ages.put("Bob", 30);

System.out.println(ages.get("Alice"));
System.out.println(ages.containsKey("Bob"));
```

## Parcourir une Map

```java
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " " + entry.getValue());
}
```

## String

```java
String texte = "Java";

texte.length();
texte.toUpperCase();
texte.toLowerCase();
texte.contains("av");
texte.startsWith("Ja");
texte.endsWith("va");
texte.substring(1, 3);
texte.replace("Java", "Java 8");
texte.equals("Java");
texte.equalsIgnoreCase("java");
texte.trim();
```

## Concaténation

```java
String nom = "Java";
String texte = "Bonjour " + nom;
```

## Conversion

```java
int nombre = Integer.parseInt("123");
double prix = Double.parseDouble("19.99");
String texte = String.valueOf(123);
```

## Méthode

```java
public static int addition(int a, int b) {
    return a + b;
}
```

## Classe

```java
public class Person {

    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

## Créer un objet

```java
Person person = new Person("Alice", 25);

System.out.println(person.getName());
```

## Héritage

```java
public class Employee extends Person {

    public Employee(String name, int age) {
        super(name, age);
    }
}
```

## Interface

```java
public interface Printable {
    void print();
}
```

```java
public class Document implements Printable {

    @Override
    public void print() {
        System.out.println("Document");
    }
}
```

## Classe abstraite

```java
public abstract class Animal {
    public abstract void sound();
}
```

## Modificateurs

```text
public
protected
private
static
final
abstract
```

## Comparaisons

```java
a == b
a != b
a > b
a >= b
a < b
a <= b
```

Pour les objets et les String :

```java
nom.equals("Java");
```

## Opérateurs logiques

```java
a && b
a || b
!a
```

## Ternaire

```java
String resultat = age >= 18 ? "Majeur" : "Mineur";
```

## Try catch

```java
try {
    int nombre = Integer.parseInt("123");
} catch (NumberFormatException e) {
    System.out.println(e.getMessage());
} finally {
    System.out.println("Fin");
}
```

## Throw

```java
if (age < 0) {
    throw new IllegalArgumentException("Age invalide");
}
```

## Throws

```java
public static void read() throws IOException {
}
```

## Lambda

```java
noms.forEach(nom -> System.out.println(nom));
```

## Référence de méthode

```java
noms.forEach(System.out::println);
```

## Stream

```java
noms.stream()
    .filter(nom -> nom.startsWith("A"))
    .forEach(System.out::println);
```

## Map avec Stream

```java
List<Integer> longueurs = noms.stream()
    .map(String::length)
    .collect(Collectors.toList());
```

## Trier une List

```java
Collections.sort(noms);
```

```java
noms.sort(Comparator.naturalOrder());
noms.sort(Comparator.reverseOrder());
```

## Optional

```java
Optional<String> nom = Optional.of("Java");

if (nom.isPresent()) {
    System.out.println(nom.get());
}
```

```java
String valeur = nom.orElse("Inconnu");
```

## Date et heure

```java
import java.time.LocalDate;
import java.time.LocalDateTime;

LocalDate date = LocalDate.now();
LocalDateTime dateTime = LocalDateTime.now();
```

## Lire un fichier

```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

List<String> lignes = Files.readAllLines(Paths.get("data.txt"));
```

## Écrire un fichier

```java
Files.write(Paths.get("data.txt"), "Hello".getBytes());
```

## Arguments du programme

```java
public static void main(String[] args) {
    for (String arg : args) {
        System.out.println(arg);
    }
}
```

Exécution :

```bash
java Main hello world
```

## Version Java

```bash
java -version
javac -version
```

## Compiler

```bash
javac Main.java
```

## Exécuter

```bash
java Main
```

## Compiler plusieurs classes

```bash
javac *.java
```

## Créer un JAR exécutable

```bash
jar cfe app.jar Main *.class
```

## Exécuter un JAR

```bash
java -jar app.jar
```

## Afficher le contenu d'un JAR

```bash
jar tf app.jar
```

## Librairie externe

Windows :

```bash
javac -cp "lib/*" Main.java
java -cp ".;lib/*" Main
```

Linux / macOS :

```bash
javac -cp "lib/*" Main.java
java -cp ".:lib/*" Main
```

## Aide

```bash
java -help
javac -help
jar
```
