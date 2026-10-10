# Java 8 - Émetteur TCP

## Principe

Créer une application Java 8 qui se connecte à un serveur TCP et lui envoie un message JSON toutes les secondes.

- Protocole : TCP
- Adresse : `127.0.0.1`
- Port : `5000`
- Intervalle : `1000 ms`
- Sans Maven
- Sans bibliothèque externe

TCP établit une connexion et fournit un flux d'octets fiable et ordonné tant que la connexion fonctionne.

## Structure du projet

```text
java-tcp-emitter/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("TCP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("TCP_PORT", "5000"));
        int interval = Integer.parseInt(System.getenv().getOrDefault("TCP_INTERVAL_MS", "1000"));

        try (Socket socket = new Socket(address, port)) {

            OutputStream output = socket.getOutputStream();

            int counter = 1;

            while (true) {

                String message = String.format(
                    "{\"name\":\"target-%03d\",\"distance\":%d}",
                    counter,
                    1000 + counter * 100
                );

                byte[] data = (message + "\n").getBytes(StandardCharsets.UTF_8);

                output.write(data);
                output.flush();

                System.out.println(
                    "TCP -> " + address + ":" + port + " " + message
                );

                counter++;

                Thread.sleep(interval);
            }
        }
    }
}
```

## Compilation Windows

```bat
mkdir build
javac -d build src/Main.java
```

## Exécution Windows

```bat
java -cp build Main
```

## Compilation Linux

```bash
mkdir -p build
javac -d build src/Main.java
```

## Exécution Linux

```bash
java -cp build Main
```

## Résultat

```text
TCP -> 127.0.0.1:5000 {"name":"target-001","distance":1100}
TCP -> 127.0.0.1:5000 {"name":"target-002","distance":1200}
TCP -> 127.0.0.1:5000 {"name":"target-003","distance":1300}
```

## Configuration Windows

```bat
set TCP_ADDRESS=127.0.0.1
set TCP_PORT=6000
set TCP_INTERVAL_MS=500

java -cp build Main
```

## Configuration Linux

```bash
export TCP_ADDRESS=127.0.0.1
export TCP_PORT=6000
export TCP_INTERVAL_MS=500

java -cp build Main
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `Socket` | Établir une connexion TCP |
| `OutputStream` | Écrire les données sur la connexion |
| `StandardCharsets.UTF_8` | Encoder les messages |
| `Thread` | Temporiser l'envoi |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `new Socket()` | Se connecter au serveur |
| `getOutputStream()` | Obtenir le flux de sortie |
| `write()` | Écrire les octets |
| `flush()` | Vider les éventuels tampons du flux |
| `Thread.sleep()` | Attendre avant le prochain envoi |

## À retenir

- TCP nécessite un serveur à l'écoute.
- `Socket` représente la connexion au serveur.
- `write()` transmet les données dans le flux TCP.
- Le caractère `\n` sépare les messages JSON.
- TCP ne conserve pas automatiquement les frontières des messages.
- Le serveur doit être lancé avant l'émetteur.
- Un échec de connexion ou d'écriture provoque une exception dans cet exemple.
- L'application fonctionne en Java 8 sans bibliothèque externe.
