# Commandes Java 8

## Version Java

```bash
java -version
```

## Version du compilateur

```bash
javac -version
```

## Compiler

```bash
javac Main.java
```

## Exécuter une classe

```bash
java Main
```

## Créer un JAR exécutable

```bash
jar cfe app.jar Main Main.class
```

## Exécuter un JAR

```bash
java -jar app.jar
```

## Afficher le contenu d'un JAR

```bash
jar tf app.jar
```

## Utiliser une librairie externe

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
