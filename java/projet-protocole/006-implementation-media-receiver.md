# 006 - Implémentation Media Receiver

## Objectif

Développer une application Java 8 qui reçoit et décode les messages binaires Media Protocol V1 via UDP, en utilisant `media-protocol.jar`.

Java 8, sans Maven et sans autre dépendance externe que notre bibliothèque.

## 1. Prérequis

- [004 - Implémentation Protocole Media](004-implementation-protocole-media.md)
- [005 - Implémentation Media Emitter](005-implementation-media-emitter.md)

Les fichiers `media-protocol.jar` et `media-emitter.jar` ont été construits lors des étapes précédentes.

## 2. Projet

```text
media-receiver/
├── src/
│   └── Main.java
├── lib/
│   └── media-protocol.jar
└── build/
```

Copier `media-protocol.jar` dans le répertoire `lib`.

## 3. Main.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) throws Exception {

        int port = Integer.parseInt(
            System.getenv().getOrDefault("UDP_PORT", "5000")
        );

        try (DatagramSocket socket = new DatagramSocket(port)) {

            System.out.println("Media Receiver UDP");
            System.out.println("Port : " + port);

            while (true) {

                byte[] buffer = new byte[1024];
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

                socket.receive(packet);

                byte[] bytes = Arrays.copyOfRange(
                    packet.getData(),
                    packet.getOffset(),
                    packet.getOffset() + packet.getLength()
                );

                System.out.println();
                System.out.println("Source : "
                    + packet.getAddress().getHostAddress()
                    + ":" + packet.getPort());
                System.out.println("Taille : " + bytes.length + " octets");

                System.out.print("Binary : ");
                for (byte value : bytes) {
                    System.out.printf("%02X ", value & 0xFF);
                }
                System.out.println();

                try {
                    MediaMessage message = MediaDecoder.decode(bytes);
                    Media media = message.getMedia();
                    System.out.println("Media  : " + media);
                } catch (ProtocolException e) {
                    System.out.println("Erreur : " + e.getMessage());
                }
            }
        }
    }
}
```

## 4. Compilation

Windows CMD :

```bat
mkdir build\classes
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
```

Linux :

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

Au démarrage :

```text
Media Receiver UDP
Port : 5000
```

## 6. Génération du JAR

```bash
jar cfe build/media-receiver.jar Main -C build/classes .
```

Le JAR contient `Main.class` ; la bibliothèque `media-protocol.jar` reste dans `lib`.

## 7. Exécution du JAR

Windows :

```bat
java -cp "build/media-receiver.jar;lib/media-protocol.jar" Main
```

Linux :

```bash
java -cp "build/media-receiver.jar:lib/media-protocol.jar" Main
```

## 8. Test complet

Terminal 1 : lancer le Receiver.

Windows :

```bat
java -cp "build/media-receiver.jar;lib/media-protocol.jar" Main
```

Terminal 2 : depuis le projet `media-emitter`, lancer l'Emitter.

Windows :

```bat
java -cp "build/media-emitter.jar;lib/media-protocol.jar" Main
```

Sous Linux, remplacer `;` par `:` dans le classpath.

Côté Emitter :

```text
Media       : Media{id=1, year=2024}
Destination : 127.0.0.1:5000
Taille      : 16 octets
Binary      : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

Côté Receiver :

```text
Media Receiver UDP
Port : 5000

Source : 127.0.0.1:54321
Taille : 16 octets
Binary : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
Media  : Media{id=1, year=2024}
```

Le port source `54321` est illustratif : le système attribue généralement un port éphémère.

## 9. Explication

- `DatagramSocket(port)` ouvre le point d'écoute UDP.
- `socket.receive(packet)` attend un datagramme.
- `packet.getLength()` indique le nombre d'octets reçus.
- `Arrays.copyOfRange()` isole les octets utiles.
- `MediaDecoder.decode(bytes)` valide et décode Media Protocol V1.
- `ProtocolException` permet de rejeter un datagramme invalide sans arrêter la boucle.

Un tampon de 1024 octets permet de distinguer les datagrammes ordinaires de plus de 16 octets. Un datagramme dépassant le tampon peut être tronqué ; il est rejeté lorsque sa taille reçue ne correspond pas aux 16 octets du protocole.

## 10. Architecture

```text
media-emitter.jar
       |
       v
MediaEncoder (media-protocol.jar)
       |
       v
byte[16] → DatagramSocket
                 |
                 | UDP : 127.0.0.1:5000
                 v
              DatagramSocket
                 |
                 v
byte[16] → MediaDecoder (media-protocol.jar)
                 |
                 v
               Media
                 |
                 v
           media-receiver.jar
```

## 11. Configuration

| Variable | Projet | Valeur par défaut |
|---|---|---|
| UDP_ADDRESS | Emitter | 127.0.0.1 |
| UDP_PORT | Emitter | 5000 |
| UDP_PORT | Receiver | 5000 |

Le récepteur écoute par défaut sur toutes les interfaces locales.

## 12. À retenir

- L'émetteur et le récepteur sont deux processus Java indépendants.
- Tous deux chargent `media-protocol.jar`.
- Chaque datagramme conforme transporte 16 octets.
- `MediaDecoder` reconstruit l'objet métier et valide le format.
- Le récepteur reste à l'écoute après un message invalide.
- UDP ne garantit pas la livraison des datagrammes.

## Prochaine étape

007 - Tests et validation Media Protocol V1 : messages valides, messages invalides, conformité binaire et communication UDP.
