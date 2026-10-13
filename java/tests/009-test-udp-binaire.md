# Test d'intégration UDP binaire avec JUnit 4

## 1. Objectif

Créer un émetteur UDP, un récepteur UDP et un test JUnit permettant de vérifier une transmission binaire réelle.

Environnement :

- Java 8
- JUnit 4.13.2
- Sans Maven
- Sans Gradle
- Sans Mockito

## 2. Principe

```text
MediaMessage (id=258, duration=120)
             |
             v
      MediaCodec.encode()
             |
             v
      00 00 01 02 00 78
             |
             v
       UdpEmitter
             |
             | UDP 127.0.0.1
             v
       UdpReceiver
             |
             v
      MediaCodec.decode()
             |
             v
      Assertions JUnit
```

## 3. Arborescence

```text
java-udp-binary-test/
├── lib/
│   ├── junit-4.13.2.jar
│   └── hamcrest-core-1.3.jar
├── src/
│   ├── MediaMessage.java
│   ├── MediaCodec.java
│   ├── UdpEmitter.java
│   ├── UdpReceiver.java
│   └── UdpBinaryTest.java
└── build/
```

## 4. Classe MediaMessage.java

```java
public class MediaMessage {

    private final int id;
    private final short duration;

    public MediaMessage(int id, short duration) {
        this.id = id;
        this.duration = duration;
    }

    public int getId() {
        return id;
    }

    public short getDuration() {
        return duration;
    }
}
```

## 5. Classe MediaCodec.java

```java
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class MediaCodec {

    public byte[] encode(MediaMessage message) {
        ByteBuffer buffer = ByteBuffer.allocate(6);
        buffer.order(ByteOrder.BIG_ENDIAN);
        buffer.putInt(message.getId());
        buffer.putShort(message.getDuration());
        return buffer.array();
    }

    public MediaMessage decode(byte[] data) {
        if (data == null || data.length != 6) {
            throw new IllegalArgumentException("Taille invalide");
        }

        ByteBuffer buffer = ByteBuffer.wrap(data);
        buffer.order(ByteOrder.BIG_ENDIAN);

        return new MediaMessage(
            buffer.getInt(),
            buffer.getShort()
        );
    }
}
```

## 6. Classe UdpEmitter.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UdpEmitter {

    public void send(byte[] data, String address, int port)
            throws Exception {

        DatagramPacket packet = new DatagramPacket(
            data,
            data.length,
            InetAddress.getByName(address),
            port
        );

        try (DatagramSocket socket = new DatagramSocket()) {
            socket.send(packet);
        }
    }
}
```

## 7. Classe UdpReceiver.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Arrays;

public class UdpReceiver implements AutoCloseable {

    private final DatagramSocket socket;

    public UdpReceiver() throws Exception {
        socket = new DatagramSocket(
            0,
            InetAddress.getByName("127.0.0.1")
        );
        socket.setSoTimeout(2000);
    }

    public int getPort() {
        return socket.getLocalPort();
    }

    public byte[] receive() throws Exception {
        byte[] buffer = new byte[1024];
        DatagramPacket packet = new DatagramPacket(
            buffer, buffer.length
        );

        socket.receive(packet);

        return Arrays.copyOfRange(
            packet.getData(),
            packet.getOffset(),
            packet.getOffset() + packet.getLength()
        );
    }

    @Override
    public void close() {
        socket.close();
    }
}
```

## 8. Classe UdpBinaryTest.java

```java
import org.junit.Test;
import static org.junit.Assert.*;

public class UdpBinaryTest {

    @Test(timeout = 5000)
    public void testBinaryCommunication() throws Exception {

        MediaMessage source = new MediaMessage(
            258, (short) 120
        );

        MediaCodec codec = new MediaCodec();

        byte[] encoded = codec.encode(source);

        try (UdpReceiver receiver = new UdpReceiver()) {

            UdpEmitter emitter = new UdpEmitter();

            emitter.send(
                encoded,
                "127.0.0.1",
                receiver.getPort()
            );

            byte[] received = receiver.receive();

            assertArrayEquals(encoded, received);

            MediaMessage result = codec.decode(received);

            assertEquals(258, result.getId());
            assertEquals(120, result.getDuration());
        }
    }

    @Test(timeout = 5000)
    public void testNegativeValues() throws Exception {

        MediaMessage source = new MediaMessage(
            -1, (short) -2
        );

        MediaCodec codec = new MediaCodec();

        try (UdpReceiver receiver = new UdpReceiver()) {

            UdpEmitter emitter = new UdpEmitter();

            emitter.send(
                codec.encode(source),
                "127.0.0.1",
                receiver.getPort()
            );

            MediaMessage result = codec.decode(
                receiver.receive()
            );

            assertEquals(-1, result.getId());
            assertEquals(-2, result.getDuration());
        }
    }
}
```

## 9. Compilation et exécution

Télécharger :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Placer les deux JAR dans `lib`.

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\*.java
java -cp "build;lib/*" org.junit.runner.JUnitCore UdpBinaryTest
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/*.java
java -cp "build:lib/*" org.junit.runner.JUnitCore UdpBinaryTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
..
Time: 0.03

OK (2 tests)
```

## 10. À retenir

- `MediaCodec` encode et décode les données binaires.
- `DatagramSocket` transporte les octets sur UDP.
- `assertArrayEquals()` vérifie les octets reçus.
- `assertEquals()` vérifie les valeurs décodées.
- Les tests couvrent aussi les valeurs négatives.
- Un port dynamique et des délais d'expiration facilitent l'automatisation.
- Le test vérifie une transmission locale réelle mais ne garantit pas la livraison UDP dans tous les environnements.
