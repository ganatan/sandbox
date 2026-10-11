# 005 - Implémentation Media Emitter

## Objectif

Développer une application Java 8 qui utilise `media-protocol.jar` pour envoyer un message binaire de 16 octets sur UDP, puis produire `media-emitter.jar`.

Java 8, sans Maven et sans autre dépendance externe que notre bibliothèque.

## 1. Prérequis

[004 - Implémentation Protocole Media](004-implementation-protocole-media.md)

Bibliothèque générée :

```text
media-protocol/build/media-protocol.jar
```

## 2. Projet

```text
media-emitter/
├── src/
│   └── Main.java
├── lib/
│   └── media-protocol.jar
└── build/
```

Copier `media-protocol.jar` dans `lib`.

## 3. Main.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("UDP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("UDP_PORT", "5000"));

        Media media = new Media(1, 2024);
        MediaMessage message = new MediaMessage(1, 1, media);
        byte[] bytes = MediaEncoder.encode(message);

        InetAddress destination = InetAddress.getByName(address);

        DatagramPacket packet = new DatagramPacket(
            bytes,
            bytes.length,
            destination,
            port
        );

        try (DatagramSocket socket = new DatagramSocket()) {
            socket.send(packet);
        }

        System.out.println("Media       : " + media);
        System.out.println("Destination : " + address + ":" + port);
        System.out.println("Taille      : " + bytes.length + " octets");

        System.out.print("Binary      : ");

        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }

        System.out.println();
    }
}
```

## 4. Compilation

Sous Windows CMD :

```bat
mkdir build\classes
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
```

Sous Linux :

```bash
mkdir -p build/classes
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
```

## 5. Exécution

Windows :

```bat
java -cp "build/classes;lib/media-protocol.jar" Main
```

Linux :

```bash
java -cp "build/classes:lib/media-protocol.jar" Main
```

## 6. Résultat attendu

```text
Media       : Media{id=1, year=2024}
Destination : 127.0.0.1:5000
Taille      : 16 octets
Binary      : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

Le programme envoie une fois, puis s'arrête. L'envoi local ne garantit pas que le datagramme ait été reçu.

## 7. Génération du JAR

```bash
jar cfe build/media-emitter.jar Main -C build/classes .
```

Le JAR contient `Main` mais pas les classes de `media-protocol.jar`.

## 8. Exécution du JAR

Windows :

```bat
java -cp "build/media-emitter.jar;lib/media-protocol.jar" Main
```

Linux :

```bash
java -cp "build/media-emitter.jar:lib/media-protocol.jar" Main
```

`java -jar build/media-emitter.jar` seul ne charge pas la bibliothèque externe, car le manifeste ne déclare pas son classpath.

## 9. Configuration

| Variable | Valeur par défaut |
|---|---|
| UDP_ADDRESS | 127.0.0.1 |
| UDP_PORT | 5000 |

Windows CMD :

```bat
set UDP_ADDRESS=127.0.0.1
set UDP_PORT=5000
java -cp "build/media-emitter.jar;lib/media-protocol.jar" Main
```

Linux :

```bash
export UDP_ADDRESS=127.0.0.1
export UDP_PORT=5000
java -cp "build/media-emitter.jar:lib/media-protocol.jar" Main
```

## 10. Explication

```java
Media media = new Media(1, 2024);
MediaMessage message = new MediaMessage(1, 1, media);
byte[] bytes = MediaEncoder.encode(message);
```

La bibliothèque commune sérialise le message. L'application ne réimplémente pas le protocole.

```java
DatagramPacket packet = new DatagramPacket(
    bytes,
    bytes.length,
    destination,
    port
);
```

`DatagramPacket` contient les données binaires et la destination.

```java
try (DatagramSocket socket = new DatagramSocket()) {
    socket.send(packet);
}
```

`DatagramSocket` effectue l'envoi UDP, sans connexion préalable.

## 11. Architecture

```text
media-emitter.jar
       |
       v
Media / MediaMessage
       |
       v
media-protocol.jar
       |
       v
MediaEncoder
       |
       v
byte[16]
       |
       v
DatagramPacket
       |
       v
DatagramSocket
       |
       v
UDP 127.0.0.1:5000
```

## 12. À retenir

- `media-emitter` est une application indépendante.
- `media-protocol.jar` contient les règles du protocole.
- `MediaEncoder` produit un tableau de 16 octets.
- `DatagramPacket` prépare le datagramme UDP.
- `DatagramSocket` l'envoie.
- Le programme transmet une seule fois avant de se terminer.

## Prochaine étape

Implémenter `media-receiver`, qui recevra les datagrammes UDP et les décodera avec `MediaDecoder`.
