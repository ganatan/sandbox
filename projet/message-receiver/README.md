# Java 8 - MessageReceiver : constructeurs et configurations

## Objectif

Créer deux récepteurs de messages héritant de la même classe abstraite, mais utilisant chacun une configuration différente. Un constructeur sans paramètre conserve la configuration par défaut et un constructeur avec paramètre permet de choisir la configuration.

## Arborescence

```text
019-message-receiver/
├── README.md
└── src/
    ├── MessageConfiguration.java
    ├── DefaultMessageConfiguration.java
    ├── SpecialMessageConfiguration.java
    ├── StdMessageReceiver.java
    ├── AbstractMessageReceiver.java
    ├── MyMessageReceiver.java
    ├── MyMessageReceiver2.java
    └── Main.java
```

## Concepts Java 8

- `MessageConfiguration` est une interface commune aux différentes configurations.
- `DefaultMessageConfiguration.INSTANCE` et `SpecialMessageConfiguration.INSTANCE` sont des constantes d'enum, utilisées comme instances uniques.
- `StdMessageReceiver` reçoit la configuration dans son constructeur et la conserve dans un champ `final`.
- `AbstractMessageReceiver()` appelle `this(DefaultMessageConfiguration.INSTANCE)` : c'est la délégation entre constructeurs.
- `AbstractMessageReceiver(MessageConfiguration configuration)` appelle `super(configuration)` : c'est la transmission à la classe mère.
- `MyMessageReceiver` choisit la configuration par défaut.
- `MyMessageReceiver2` choisit la configuration spéciale ou celle fournie lors de l'instanciation.

## Compilation

Depuis le dossier `019-message-receiver` :

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

## Résultat attendu

```text
Configuration par defaut : Bonjour du recepteur 1
Configuration speciale : Bonjour du recepteur 2
Configuration par defaut : Configuration choisie dans Main
```

## Important

Le type du paramètre est `MessageConfiguration` et non une classe de configuration concrète. Les deux enums peuvent donc être transmis au même constructeur. Le constructeur sans paramètre reste disponible pour préserver les appels existants.

Dans un projet réel, remplace `MessageConfiguration` par le type commun effectivement attendu par le constructeur de la classe mère.
