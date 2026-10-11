# 011 - Binary TCP Receiver

## Objectif

Créer un second projet Java 8 indépendant qui accepte des connexions TCP, lit **12 octets binaires** par connexion et reconstruit un objet `Target`.

Sans Maven ni dépendance externe.

## Projet

```text
java-binary-tcp-receiver/
├── Main.java
└── Target.java
```

## Target.java

```java
public class Target {

    private int id;
    private int distance;
    private float speed;

    public Target(int id, int distance, float speed) {
        this.id = id;
        this.distance = distance;
        this.speed = speed;
    }

    public int getId() {
        return id;
    }

    public int getDistance() {
        return distance;
    }

    public float getSpeed() {
        return speed;
    }

    @Override
    public String toString() {
        return "Target{id=" + id + ", distance=" + distance + ", speed=" + speed + "}";
    }
}
```

## Main.java

```java
import java.io.DataInputStream;
import java.io.EOFException;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) throws Exception {

        int port = Integer.parseInt(System.getenv().getOrDefault("TCP_PORT", "5000"));

        try (ServerSocket server = new ServerSocket(port)) {
            System.out.println("Receiver TCP : port " + port);

            while (true) {
                try (Socket socket = server.accept();
                     DataInputStream input = new DataInputStream(socket.getInputStream())) {

                    byte[] bytes = new byte[12];

                    try {
                        input.readFully(bytes);
                    } catch (EOFException e) {
                        System.out.println("Message incomplet");
                        continue;
                    }

                    ByteBuffer buffer = ByteBuffer.wrap(bytes);
                    Target target = new Target(buffer.getInt(), buffer.getInt(), buffer.getFloat());

                    System.out.println("Source : " + socket.getInetAddress().getHostAddress() + ":" + socket.getPort());
                    System.out.println("Target : " + target);
                }
            }
        }
    }
}
```

## Compilation

```bash
javac Main.java Target.java
```

## Exécution

```bash
java Main
```

Variable d'environnement facultative : `TCP_PORT`, défaut `5000`.

Le serveur reste actif jusqu'à `Ctrl+C` et accepte des connexions successives.

## Résultat attendu

Au démarrage :

```text
Receiver TCP : port 5000
```

Après l'exécution de l'[émetteur TCP](010-binary-tcp-emitter.md) :

```text
Source : 127.0.0.1:<port-source>
Target : Target{id=1, distance=1500, speed=25.5}
```

Le port source est attribué par le système d'exploitation.

## Explication

- `ServerSocket(port)` écoute les connexions TCP.
- `accept()` attend un client.
- `DataInputStream.readFully(bytes)` attend les 12 octets du message ou échoue si le flux se termine trop tôt.
- `ByteBuffer.wrap(bytes)` prépare le décodage.
- `getInt()`, `getInt()`, `getFloat()` reconstruisent l'objet `Target`.

`readFully` est important : un appel simple à `read()` n'est pas garanti de retourner les 12 octets en une seule lecture.

Dans cet exemple, chaque connexion contient un seul message de 12 octets. Le serveur traite les clients **séquentiellement**, sans gérer plusieurs connexions en parallèle.

## Test local

Terminal 1, dans `java-binary-tcp-receiver` :

```bash
javac Main.java Target.java
java Main
```

Terminal 2, dans `java-binary-tcp-emitter` :

```bash
javac Main.java Target.java
java Main
```

## Comparaison UDP / TCP

| UDP | TCP |
|---|---|
| Datagrammes | Flux d'octets |
| Pas de connexion préalable | Connexion préalable |
| Livraison non garantie | Livraison fiable tant que la connexion fonctionne ; erreurs possibles en cas de rupture |
| Frontières des datagrammes conservées | Frontières de messages à définir dans l'application |

Les deux applications utilisent le même format binaire de 12 octets que les tutoriels UDP.
