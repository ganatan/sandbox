# Compilation Java 8 - Plusieurs classes

## Fichiers

```text
Main.java
Person.java
```

## Person.java

```java
public class Person {

    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

## Main.java

```java
public class Main {

    public static void main(String[] args) {
        Person person = new Person("Alice");
        System.out.println(person.getName());
    }
}
```

## Compiler

```bash
javac Main.java Person.java
```

Ou compiler tous les fichiers Java du répertoire :

```bash
javac *.java
```

Fichiers générés :

```text
Main.class
Person.class
```

## Exécuter

```bash
java Main
```

## Créer le JAR

```bash
jar cfe app.jar Main Main.class Person.class
```

Ou :

```bash
jar cfe app.jar Main *.class
```

## Exécuter le JAR

```bash
java -jar app.jar
```
