# Java 8 - AbstractReceiver et super()

## Objectif

Passer une valeur différente au constructeur de la classe mère, sans `INSTANCE`, tout en conservant un paramètre `InterfaceLogger`.

## Structure

```text
message-receiver/
├── README.md
└── src/
    ├── InterfaceLogger.java
    ├── ConsoleLogger.java
    ├── Receiver.java
    ├── AbstractReceiver.java
    ├── MyReceiver.java
    ├── MyReceiver2.java
    └── Main.java
```

## Principe

`Receiver` reçoit un `InterfaceLogger` et une chaîne de caractères.

`AbstractReceiver` possède deux constructeurs :

```java
protected AbstractReceiver(InterfaceLogger logger) {
    this(logger, "DEFAULT");
}

protected AbstractReceiver(InterfaceLogger logger, String type) {
    super(logger, type);
}
```

`MyReceiver` utilise la valeur par défaut :

```java
public MyReceiver(InterfaceLogger logger) {
    super(logger);
}
```

`MyReceiver2` définit une valeur directement dans l'appel à `super` :

```java
public MyReceiver2(InterfaceLogger logger) {
    super(logger, "SPECIAL");
}
```

`this(...)` appelle un autre constructeur de la même classe. `super(...)` appelle un constructeur de la classe mère. Ces appels doivent être la première instruction du constructeur en Java 8.

## Compiler et exécuter

Depuis `message-receiver/` :

```bash
mkdir build
javac -source 8 -target 8 -d build src/*.java
java -cp build Main
```

Sous Windows CMD :

```cmd
mkdir build
javac -source 8 -target 8 -d build src\*.java
java -cp build Main
```

Résultat :

```text
DEFAULT : Bonjour
SPECIAL : Bonjour
```

Aucune dépendance externe, ni Maven, ni Gradle, ni Ant requis.
