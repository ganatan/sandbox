# Test d'intégration UDP avec JUnit 4

## 1. Objectif

Créer un émetteur UDP, un récepteur UDP et un test JUnit qui vérifie la transmission d'un message.

Environnement :

- Java 8
- JUnit 4.13.2
- Communication UDP locale
- Sans Maven
- Sans Gradle
- Sans Mockito

## 2. Principe

Le test utilise une véritable communication réseau sur l'interface locale.

```text
JUnit
  |
  v
UdpReceiver (127.0.0.1)
  ^
  | Datagramme UDP
  |
UdpEmitter
  |
  v
Vérification du message reçu
```

Un port local est attribué automatiquement par le système pour réduire les conflits.

## 3. Arborescence

```text
java-udp-test/
├── lib/
│   ├── junit-4.13.2.jar
│   └── hamcrest-core-1.3.jar
├── src/
│   ├── UdpEmitter.java
│   ├── UdpReceiver.java
│   └── UdpIntegrationTest.java
└── build/
```

## 4. Classe UdpEmitter.java

Créer `src/UdpEmitter.java`.

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;

public class UdpEmitter {

    public void send(String message, String address, int port) throws Exception {

        byte[] data = message.getBytes(StandardCharsets.UTF_8);

        InetAddress destination = InetAddress.getByName(address);

        DatagramPacket packet = new DatagramPacket(
            data,
            data.length,
            destination,
            port
        );

        try (DatagramSocket socket = new DatagramSocket()) {
            socket.send(packet);
        }
    }
}
```

Cette classe convertit le texte en octets UTF-8 et l'envoie par UDP.

## 5. Classe UdpReceiver.java

Créer `src/UdpReceiver.java`.

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;

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

    public String receive() throws Exception {

        byte[] buffer = new byte[1024];

        DatagramPacket packet = new DatagramPacket(
            buffer,
            buffer.length
        );

        socket.receive(packet);

        return new String(
            packet.getData(),
            packet.getOffset(),
            packet.getLength(),
            StandardCharsets.UTF_8
        );
    }

    @Override
    public void close() {
        socket.close();
    }
}
```

`0` demande au système d'exploitation un port disponible. `setSoTimeout(2000)` limite la réception bloquante à deux secondes.

## 6. Classe UdpIntegrationTest.java

Créer `src/UdpIntegrationTest.java`.

```java
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UdpIntegrationTest {

    @Test(timeout = 5000)
    public void testUdpCommunication() throws Exception {

        String message = "Interstellar";

        try (UdpReceiver receiver = new UdpReceiver()) {

            int port = receiver.getPort();

            UdpEmitter emitter = new UdpEmitter();

            emitter.send(message, "127.0.0.1", port);

            String received = receiver.receive();

            assertEquals(message, received);
        }
    }
}
```

Le test ouvre le récepteur, récupère son port, envoie `Interstellar`, reçoit le datagramme, compare les chaînes et ferme le socket.

## 7. Explications

| Élément | Rôle |
|---|---|
| `DatagramSocket` | Socket UDP |
| `DatagramPacket` | Datagramme envoyé ou reçu |
| `socket.send()` | Envoie un datagramme |
| `socket.receive()` | Attend un datagramme |
| `getLocalPort()` | Retourne le port local |
| `setSoTimeout()` | Limite l'attente de réception |
| `@Test(timeout = 5000)` | Fixe une limite temporelle au test |
| `assertEquals()` | Compare les messages |

### Pourquoi démarrer le récepteur avant l'émetteur ?

Le socket doit déjà être ouvert lors de l'envoi. Aucun thread ni `Thread.sleep()` n'est nécessaire.

### Pourquoi deux délais ?

```java
socket.setSoTimeout(2000);
```

Limite l'attente sur la réception à deux secondes.

```java
@Test(timeout = 5000)
```

Demande à JUnit de signaler l'échec après cinq secondes. Ce timeout JUnit ne remplace pas le timeout du socket et n'interrompt pas nécessairement toute opération bloquante.

## 8. Installation de JUnit

Télécharger :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Placer les deux JAR dans `lib`.

## 9. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\UdpEmitter.java src\UdpReceiver.java src\UdpIntegrationTest.java
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/*.java
```

## 10. Exécution

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore UdpIntegrationTest
```

Linux :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore UdpIntegrationTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
.
Time: 0.03

OK (1 test)
```

## 11. Provoquer un échec

Dans le test, remplacer :

```java
assertEquals(message, received);
```

par :

```java
assertEquals("Inception", received);
```

JUnit constate la différence :

```text
org.junit.ComparisonFailure:
expected:<[Inception]> but was:<[Interstellar]>

FAILURES!!!
Tests run: 1, Failures: 1
```

## 12. Tester une absence de message

Ajouter l'import :

```java
import java.net.SocketTimeoutException;
```

Puis ajouter cette méthode dans `UdpIntegrationTest.java` :

```java
@Test(timeout = 5000, expected = SocketTimeoutException.class)
public void testUdpTimeout() throws Exception {

    try (UdpReceiver receiver = new UdpReceiver()) {
        receiver.receive();
    }
}
```

Le test réussit si aucun datagramme n'arrive et si le socket déclenche `SocketTimeoutException`.

Avec les deux tests :

```text
OK (2 tests)
```

## 13. Limites d'un test UDP

UDP ne garantit pas :

- La livraison des datagrammes.
- Leur ordre d'arrivée.
- L'absence de doublons.

Sur `127.0.0.1`, la communication est généralement fiable, mais un test réseau peut toujours être perturbé par l'environnement.

## 14. À retenir

- JUnit peut tester une véritable communication UDP.
- `DatagramSocket` permet d'envoyer et de recevoir des datagrammes.
- Un port dynamique évite les conflits avec les ports fixes.
- Le récepteur doit être prêt avant l'envoi.
- `assertEquals()` vérifie le contenu reçu.
- `setSoTimeout()` évite une réception bloquée indéfiniment.
- `try-with-resources` ferme automatiquement le socket.
- Un test UDP est un test d'intégration.
