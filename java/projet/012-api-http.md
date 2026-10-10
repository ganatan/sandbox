# Java 8 - API HTTP

## Principe

Créer un serveur HTTP en Java 8 qui expose une API retournant du JSON.

- Java 8
- Sans Maven
- Sans Spring Boot
- Sans bibliothèque externe
- Port : `3000`
- URL : `http://localhost:3000/bonjour`

## Structure du projet

```text
java-api/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(
            new InetSocketAddress("127.0.0.1", 3000),
            0
        );

        server.createContext("/bonjour", new HttpHandler() {

            @Override
            public void handle(HttpExchange exchange) throws java.io.IOException {

                String json = "{\"message\":\"Bonjour\"}";

                byte[] response = json.getBytes(StandardCharsets.UTF_8);

                exchange.getResponseHeaders().set(
                    "Content-Type",
                    "application/json; charset=UTF-8"
                );

                exchange.sendResponseHeaders(200, response.length);

                try (OutputStream output = exchange.getResponseBody()) {
                    output.write(response);
                }
            }
        });

        server.start();

        System.out.println("API : http://localhost:3000/bonjour");
    }
}
```

## Compilation Windows

Depuis la racine du projet :

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

## Tester avec un navigateur

Ouvrir :

```text
http://localhost:3000/bonjour
```

## Résultat JSON

```json
{
  "message": "Bonjour"
}
```

## Tester avec curl

```bash
curl http://localhost:3000/bonjour
```

## Tester avec Postman

| Paramètre | Valeur |
|---|---|
| Méthode | GET |
| URL | `http://localhost:3000/bonjour` |
| Body | Aucun |
| Réponse | JSON |
| Statut | 200 OK |

## Classes utilisées

| Classe | Utilité |
|---|---|
| `HttpServer` | Créer le serveur HTTP |
| `InetSocketAddress` | Définir l'adresse et le port |
| `HttpHandler` | Traiter les requêtes |
| `HttpExchange` | Accéder à la requête et à la réponse |
| `OutputStream` | Envoyer le JSON |

## À retenir

- `HttpServer` permet de créer un serveur HTTP en Java 8.
- `createContext()` associe un chemin URL à un traitement.
- `HttpHandler` traite les requêtes HTTP.
- `sendResponseHeaders()` définit le statut et la longueur de la réponse.
- Le JSON est construit manuellement, sans dépendance externe.
- Le serveur reste actif jusqu'à son arrêt avec `Ctrl + C`.
- Cet exemple est destiné à un usage local et pédagogique, sans authentification ni gestion avancée des requêtes.
