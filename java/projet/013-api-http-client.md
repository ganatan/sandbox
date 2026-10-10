# Java 8 - Client HTTP API

## Principe

Créer une application Java 8 qui appelle une API HTTP et affiche sa réponse JSON dans la console.

- Java 8
- Sans Maven
- Sans bibliothèque externe
- Méthode : GET
- URL : `http://localhost:3000/bonjour`

## Structure du projet

```text
java-api-client/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        URL url = new URL("http://localhost:3000/bonjour");

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        try {

            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);

            int status = connection.getResponseCode();

            if (status != 200) {
                throw new RuntimeException("Erreur HTTP : " + status);
            }

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(
                        connection.getInputStream(),
                        StandardCharsets.UTF_8
                    ))) {

                StringBuilder response = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }

                System.out.println(response.toString());
            }

        } finally {
            connection.disconnect();
        }
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

## Test

Démarrer l'API du tutoriel précédent :

[012 - API HTTP](012-api-http.md)

L'API doit répondre sur :

```text
http://localhost:3000/bonjour
```

Puis lancer le client dans un deuxième terminal.

## Résultat console

```json
{"message":"Bonjour"}
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `URL` | Représenter l'adresse HTTP |
| `HttpURLConnection` | Effectuer la requête HTTP |
| `InputStreamReader` | Décoder les octets en caractères |
| `BufferedReader` | Lire la réponse |
| `StringBuilder` | Construire le résultat |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `openConnection()` | Préparer la connexion |
| `setRequestMethod()` | Définir la méthode HTTP |
| `getResponseCode()` | Récupérer le statut HTTP |
| `getInputStream()` | Lire le corps de la réponse |
| `readLine()` | Lire une ligne |
| `disconnect()` | Libérer la connexion |

## À retenir

- `HttpURLConnection` est disponible dans Java 8.
- `GET` permet de récupérer des données depuis une API.
- `getResponseCode()` récupère le statut HTTP.
- `getInputStream()` récupère le contenu de la réponse.
- `System.out.println()` affiche le résultat dans la console.
- La réponse JSON reste une chaîne de caractères : elle n'est pas convertie en objet Java.
- Aucun serveur HTTP n'est créé dans cette application : il s'agit uniquement d'un client.
