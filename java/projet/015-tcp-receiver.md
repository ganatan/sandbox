# Java 8 - Récepteur TCP

## Principe

Créer une application Java 8 qui écoute un port TCP, accepte une connexion et affiche les messages JSON reçus.

- Protocole : TCP
- Adresse : `127.0.0.1`
- Port : `5000`
- Sans Maven
- Sans bibliothèque externe

## Structure du projet

```text
java-tcp-receiver/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("TCP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("TCP_PORT", "5000"));

        InetAddress interfaceAddress = InetAddress.getByName(address);

        try (ServerSocket server = new ServerSocket(port, 50, interfaceAddress)) {

            System.out.println("TCP écoute -> " + address + ":" + port);

            while (true) {

                try (Socket socket = server.accept();
                     BufferedReader reader = new BufferedReader(
                         new InputStreamReader(
                             socket.getInputStream(),
                             StandardCharsets.UTF_8
                         )
                     )) {

                    System.out.println(
                        "Client connecté : " + socket.getRemoteSocketAddress()
                    );

                    String message;

                    while ((message = reader.readLine()) != null) {

                        System.out.println("TCP <- " + message);
                    }

                    System.out.println("Client déconnecté");
                }
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
TCP écoute -> 127.0.0.1:5000
Client connecté : /127.0.0.1:54321
TCP <- {"name":"target-001","distance":1100}
TCP <- {"name":"target-002","distance":1200}
TCP <- {"name":"target-003","distance":1300}
```

Le port `54321` représente un port client attribué automatiquement.

## Configuration Windows

```bat
set TCP_ADDRESS=127.0.0.1
set TCP_PORT=6000

java -cp build Main
```

## Configuration Linux

```bash
export TCP_ADDRESS=127.0.0.1
export TCP_PORT=6000

java -cp build Main
```

## Écouter sur toutes les interfaces

```bash
export TCP_ADDRESS=0.0.0.0

java -cp build Main
```

`0.0.0.0` permet d'écouter sur toutes les interfaces IPv4. Côté émetteur, utiliser une véritable adresse IP accessible.

## Classes utilisées

| Classe | Utilité |
|---|---|
| `ServerSocket` | Écouter les connexions TCP |
| `Socket` | Représenter un client connecté |
| `BufferedReader` | Lire les messages |
| `InputStreamReader` | Décoder les octets en caractères |
| `InetAddress` | Définir l'adresse d'écoute |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `new ServerSocket()` | Ouvrir le serveur TCP |
| `accept()` | Attendre une connexion |
| `getInputStream()` | Récupérer les données du client |
| `readLine()` | Lire un message terminé par `\n` |
| `close()` | Fermer les ressources automatiquement ici |

## À retenir

- `ServerSocket` écoute les connexions entrantes.
- `accept()` attend qu'un client se connecte.
- Chaque connexion est représentée par un `Socket`.
- `readLine()` lit un message jusqu'au séparateur de ligne.
- Le serveur traite les clients successivement, pas simultanément.
- Lorsque le client se déconnecte, le serveur attend une nouvelle connexion.
- Le JSON est affiché comme une chaîne de caractères.
- L'application fonctionne en Java 8 sans bibliothèque externe.
