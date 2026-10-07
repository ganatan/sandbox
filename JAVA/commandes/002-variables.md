# Variables Java 8

## Types primitifs

```java
byte nombre = 10;
short compteur = 1000;
int age = 25;
long distance = 1000L;
float taux = 1.5f;
double prix = 19.99;
boolean actif = true;
char lettre = 'A';
```

## String

```java
String nom = "Java";
```

## Déclaration

```java
int age;
```

## Initialisation

```java
int age = 25;
```

## Modifier une variable

```java
int age = 25;
age = 26;
```

## Constante

```java
final int MAX = 100;
```

## Plusieurs variables

```java
int x = 10;
int y = 20;
int z = 30;
```

## Valeur null

Les types objets peuvent avoir la valeur `null`.

```java
String nom = null;
Integer age = null;
```

Les types primitifs ne peuvent pas avoir la valeur `null`.

```java
int age = 0;
boolean actif = false;
```

## Types primitifs et wrappers

| Primitif | Wrapper |
| --- | --- |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| boolean | Boolean |
| char | Character |

## Conversion implicite

```java
int nombre = 10;
long valeur = nombre;
double resultat = valeur;
```

## Conversion explicite

```java
double prix = 19.99;
int valeur = (int) prix;
```

## String vers nombre

```java
int nombre = Integer.parseInt("123");
long valeur = Long.parseLong("123");
double prix = Double.parseDouble("19.99");
```

## Nombre vers String

```java
String texte = String.valueOf(123);
```

## Portée locale

```java
public static void main(String[] args) {
    int age = 25;
    System.out.println(age);
}
```

## Attribut de classe

```java
public class Person {

    private String name;
    private int age;
}
```

## Variable static

```java
public class Person {

    public static int count = 0;
}
```
