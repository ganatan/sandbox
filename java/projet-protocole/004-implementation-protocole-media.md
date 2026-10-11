# 004 - Implémentation Protocole Media

## Objectif

Développer `media-protocol.jar`, bibliothèque Java 8 qui encode et décode Media Protocol V1, indépendamment du transport UDP.

Documents de référence :

- [001 - Documentation Protocole Media](001-documentation-protocole-media.md)
- [002 - Analyse Protocole Media](002-analyse-protocole-media.md)
- [003 - Architecture Protocole Media](003-architecture-protocole-media.md)

Java 8, sans Maven ni dépendance externe, encodage Big Endian.

## 1. Projet

```text
media-protocol/
└── src/
    ├── Media.java
    ├── MediaMessage.java
    ├── MediaEncoder.java
    ├── MediaDecoder.java
    └── ProtocolException.java
```

## 2. Media.java

```java
public class Media {

    private int id;
    private int year;

    public Media(int id, int year) {
        this.id = id;
        this.year = year;
    }

    public int getId() {
        return id;
    }

    public int getYear() {
        return year;
    }

    @Override
    public String toString() {
        return "Media{id=" + id + ", year=" + year + "}";
    }
}
```

## 3. MediaMessage.java

```java
public class MediaMessage {

    private int version;
    private int type;
    private Media media;

    public MediaMessage(int version, int type, Media media) {
        this.version = version;
        this.type = type;
        this.media = media;
    }

    public int getVersion() {
        return version;
    }

    public int getType() {
        return type;
    }

    public Media getMedia() {
        return media;
    }
}
```

## 4. ProtocolException.java

```java
public class ProtocolException extends Exception {

    public ProtocolException(String message) {
        super(message);
    }
}
```

## 5. MediaEncoder.java

```java
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class MediaEncoder {

    public static byte[] encode(MediaMessage message) throws ProtocolException {

        if (message == null || message.getMedia() == null) {
            throw new ProtocolException("Message invalide");
        }

        if (message.getVersion() != 1) {
            throw new ProtocolException("Version invalide");
        }

        if (message.getType() != 1) {
            throw new ProtocolException("Type invalide");
        }

        ByteBuffer buffer = ByteBuffer.allocate(16);
        buffer.order(ByteOrder.BIG_ENDIAN);

        buffer.put((byte) 0x4D);
        buffer.put((byte) 0x50);
        buffer.put((byte) message.getVersion());
        buffer.put((byte) message.getType());
        buffer.putInt(8);
        buffer.putInt(message.getMedia().getId());
        buffer.putInt(message.getMedia().getYear());

        return buffer.array();
    }
}
```

## 6. MediaDecoder.java

```java
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class MediaDecoder {

    public static MediaMessage decode(byte[] bytes) throws ProtocolException {

        if (bytes == null || bytes.length != 16) {
            throw new ProtocolException("Taille du message invalide");
        }

        ByteBuffer buffer = ByteBuffer.wrap(bytes);
        buffer.order(ByteOrder.BIG_ENDIAN);

        int magic1 = buffer.get() & 0xFF;
        int magic2 = buffer.get() & 0xFF;
        int version = buffer.get() & 0xFF;
        int type = buffer.get() & 0xFF;
        int length = buffer.getInt();

        if (magic1 != 0x4D || magic2 != 0x50) {
            throw new ProtocolException("Signature invalide");
        }

        if (version != 1) {
            throw new ProtocolException("Version inconnue");
        }

        if (type != 1) {
            throw new ProtocolException("Type inconnu");
        }

        if (length != 8) {
            throw new ProtocolException("Longueur invalide");
        }

        int id = buffer.getInt();
        int year = buffer.getInt();

        Media media = new Media(id, year);

        return new MediaMessage(version, type, media);
    }
}
```

## 7. Compilation

Depuis `media-protocol`, créer le répertoire de destination.

Windows CMD :

```bat
mkdir build\classes
javac -d build/classes src/*.java
```

Linux :

```bash
mkdir -p build/classes
javac -d build/classes src/*.java
```

## 8. Génération du JAR

```bash
jar cf build/media-protocol.jar -C build/classes .
jar tf build/media-protocol.jar
```

Résultat :

```text
media-protocol/
├── src/
│   ├── Media.java
│   ├── MediaMessage.java
│   ├── MediaEncoder.java
│   ├── MediaDecoder.java
│   └── ProtocolException.java
└── build/
    ├── classes/
    └── media-protocol.jar
```

Le JAR est une bibliothèque : il ne possède pas de classe `Main` exécutable.

## 9. Test local

Créer `src/TestMain.java` après la génération du JAR :

```java
public class TestMain {

    public static void main(String[] args) throws Exception {

        Media media = new Media(1, 2024);
        MediaMessage message = new MediaMessage(1, 1, media);

        byte[] bytes = MediaEncoder.encode(message);

        System.out.print("Binary : ");
        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }
        System.out.println();

        MediaMessage decoded = MediaDecoder.decode(bytes);
        System.out.println("Decoded : " + decoded.getMedia());
    }
}
```

Compiler :

```bash
javac -cp build/media-protocol.jar -d build/classes src/TestMain.java
```

Exécuter sous Windows :

```bat
java -cp "build/classes;build/media-protocol.jar" TestMain
```

Exécuter sous Linux :

```bash
java -cp "build/classes:build/media-protocol.jar" TestMain
```

## 10. Résultat attendu

```text
Binary : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
Decoded : Media{id=1, year=2024}
```

Le message contient exactement 16 octets : 8 octets d'en-tête et 8 octets de payload.

## 11. À retenir

- `Media` : données métier.
- `MediaMessage` : message du protocole.
- `MediaEncoder` : sérialisation binaire.
- `MediaDecoder` : validation et désérialisation.
- `ProtocolException` : erreur de protocole.
- `media-protocol.jar` : bibliothèque réutilisable, indépendante d'UDP.

## Prochaine étape

Développer `media-emitter` en Java 8, qui chargera `media-protocol.jar` et transmettra les 16 octets dans un datagramme UDP.
