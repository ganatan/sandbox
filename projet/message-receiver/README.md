# Java 8 - AbstractReceiver et super()

## Objectif

Reproduire un constructeur sans paramètre qui utilise un logger par défaut, et permettre à chaque classe fille de choisir une valeur différente transmise à `super`.

## Arborescence

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

## Constructeurs de AbstractReceiver

```java
public abstract class AbstractReceiver extends Receiver {
    protected AbstractReceiver() {
        this(new ConsoleLogger());
    }

    protected AbstractReceiver(InterfaceLogger specificLogger) {
        this(specificLogger, "DEFAULT");
    }

    protected AbstractReceiver(InterfaceLogger specificLogger, String type) {
        super(specificLogger, type);
    }
}
```

Le constructeur vide délègue au constructeur avec logger. Celui-ci délègue au constructeur avec logger et valeur. Enfin `super` transmet les deux paramètres à `Receiver`.

## Deux récepteurs

```java
public class MyReceiver extends AbstractReceiver {
    public MyReceiver() {
        super();
    }
}
```

```java
public class MyReceiver2 extends AbstractReceiver {
    public MyReceiver2() {
        super(new ConsoleLogger(), "SPECIAL");
    }
}
```

Le premier utilise `DEFAULT`. Le second utilise `SPECIAL`, passé directement à `super`, sans `INSTANCE`.

## Exécution

Depuis le dossier `message-receiver` :

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

Sortie :

```text
DEFAULT : Bonjour
SPECIAL : Bonjour
```

Ce projet est autonome sous Java 8, sans dépendances ni Ant.
