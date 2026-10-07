# Compilation Java 8

## Compiler

```bash
javac Main.java
```

Fichier généré :

```text
Main.class
```

## Créer le JAR

```bash
jar cfe app.jar Main Main.class
```

Fichier généré :

```text
app.jar
```

## Exécuter le JAR

```bash
java -jar app.jar
```
