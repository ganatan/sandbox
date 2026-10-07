# Compilation Java 8 - Répertoire build

## Fichiers

```text
Main.java
Person.java
```

## Créer le répertoire build

Windows :

```bash
mkdir build
```

Linux / macOS :

```bash
mkdir -p build
```

## Compiler dans build

```bash
javac -d build Main.java Person.java
```

Ou compiler tous les fichiers Java :

```bash
javac -d build *.java
```

Fichiers générés :

```text
build/
├── Main.class
└── Person.class
```

## Exécuter

Windows :

```bash
java -cp build Main
```

Linux / macOS :

```bash
java -cp build Main
```

## Créer le JAR

```bash
jar cfe app.jar Main -C build .
```

## Exécuter le JAR

```bash
java -jar app.jar
```
