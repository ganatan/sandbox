# 007 - Tests et Validation Protocole Media

## Objectif

Valider Media Protocol V1 : encodage, décodage, format de 16 octets, messages invalides et communication UDP.

Java 8, sans Maven, sans JUnit ni dépendance externe (hormis `media-protocol.jar`).

## 1. Prérequis

- [001 - Documentation Protocole Media](001-documentation-protocole-media.md)
- [004 - Implémentation Protocole Media](004-implementation-protocole-media.md)
- [005 - Implémentation Media Emitter](005-implementation-media-emitter.md)
- [006 - Implémentation Media Receiver](006-implementation-media-receiver.md)

JAR produits précédemment : `media-protocol.jar`, `media-emitter.jar`, `media-receiver.jar`.

## 2. Projet de test

```text
media-tests/
├── src/
│   ├── Main.java
│   └── InvalidEmitter.java
├── lib/
│   └── media-protocol.jar
└── build/
```

Copier `media-protocol.jar` dans `lib`.

## 3. Main.java

```java
import java.util.Arrays;

public class Main {

    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args) {

        run("Encodage", Main::testEncode);
        run("Decodage", Main::testDecode);
        run("Signature invalide", Main::testInvalidMagic);
        run("Version invalide", Main::testInvalidVersion);
        run("Type invalide", Main::testInvalidType);
        run("Longueur invalide", Main::testInvalidLength);
        run("Message incomplet", Main::testIncompleteMessage);

        System.out.println();
        System.out.println("Tests OK : " + passed);
        System.out.println("Tests KO : " + failed);

        if (failed > 0) {
            System.exit(1);
        }
    }

    private static void run(String name, Test test) {
        try {
            test.execute();
            passed++;
            System.out.println("OK : " + name);
        } catch (Exception | AssertionError e) {
            failed++;
            System.out.println("KO : " + name + " - " + e.getMessage());
        }
    }

    private static void testEncode() throws Exception {
        MediaMessage message = new MediaMessage(1, 1, new Media(1, 2024));
        byte[] actual = MediaEncoder.encode(message);
        check(Arrays.equals(actual, validMessage()), "Encodage incorrect");
    }

    private static void testDecode() throws Exception {
        MediaMessage message = MediaDecoder.decode(validMessage());
        check(message.getVersion() == 1, "Version incorrecte");
        check(message.getType() == 1, "Type incorrect");
        check(message.getMedia().getId() == 1, "ID incorrect");
        check(message.getMedia().getYear() == 2024, "Annee incorrecte");
    }

    private static void testInvalidMagic() throws Exception {
        byte[] bytes = validMessage();
        bytes[0] = 0x00;
        expectProtocolException(bytes);
    }

    private static void testInvalidVersion() throws Exception {
        byte[] bytes = validMessage();
        bytes[2] = 0x02;
        expectProtocolException(bytes);
    }

    private static void testInvalidType() throws Exception {
        byte[] bytes = validMessage();
        bytes[3] = 0x02;
        expectProtocolException(bytes);
    }

    private static void testInvalidLength() throws Exception {
        byte[] bytes = validMessage();
        bytes[7] = 0x07;
        expectProtocolException(bytes);
    }

    private static void testIncompleteMessage() throws Exception {
        byte[] bytes = Arrays.copyOf(validMessage(), 10);
        expectProtocolException(bytes);
    }

    private static void expectProtocolException(byte[] bytes) throws Exception {
        try {
            MediaDecoder.decode(bytes);
        } catch (ProtocolException e) {
            return;
        }
        throw new AssertionError("ProtocolException attendue");
    }

    private static void check(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }

    private static byte[] validMessage() {
        return new byte[] {
            0x4D, 0x50,
            0x01,
            0x01,
            0x00, 0x00, 0x00, 0x08,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x07, (byte) 0xE8
        };
    }

    private interface Test {
        void execute() throws Exception;
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

## 6. Résultat attendu

```text
OK : Encodage
OK : Decodage
OK : Signature invalide
OK : Version invalide
OK : Type invalide
OK : Longueur invalide
OK : Message incomplet

Tests OK : 7
Tests KO : 0
```

Le programme se termine avec un code différent de zéro si un test échoue.

## 7. Analyse des tests

| Test | Vérification |
|---|---|
| Encodage | 16 octets identiques à la spécification |
| Décodage | Champs métier et protocole corrects |
| Signature invalide | Rejet |
| Version invalide | Rejet |
| Type invalide | Rejet |
| Longueur invalide | Rejet |
| Message incomplet | Rejet |

## 8. Test d'intégration UDP

Terminal 1, dans `media-receiver` :

Windows :

```bat
java -cp "build/media-receiver.jar;lib/media-protocol.jar" Main
```

Linux :

```bash
java -cp "build/media-receiver.jar:lib/media-protocol.jar" Main
```

Terminal 2, dans `media-emitter` :

Windows :

```bat
java -cp "build/media-emitter.jar;lib/media-protocol.jar" Main
```

Linux :

```bash
java -cp "build/media-emitter.jar:lib/media-protocol.jar" Main
```

Résultat attendu côté Receiver :

```text
Media Receiver UDP
Port : 5000

Source : 127.0.0.1:54321
Taille : 16 octets
Binary : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
Media  : Media{id=1, year=2024}
```

Le port source est variable.

## 9. Test de robustesse UDP

Créer `src/InvalidEmitter.java` :

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class InvalidEmitter {

    public static void main(String[] args) throws Exception {

        byte[] bytes = {
            0x00, 0x00, 0x01, 0x01,
            0x00, 0x00, 0x00, 0x08,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x07, (byte) 0xE8
        };

        DatagramPacket packet = new DatagramPacket(
            bytes,
            bytes.length,
            InetAddress.getByName("127.0.0.1"),
            5000
        );

        try (DatagramSocket socket = new DatagramSocket()) {
            socket.send(packet);
        }

        System.out.println("Message invalide envoye");
    }
}
```

Compiler :

```bash
javac -d build/classes src/InvalidEmitter.java
```

Exécuter :

```bash
java -cp build/classes InvalidEmitter
```

Résultat attendu côté Receiver :

```text
Taille : 16 octets
Binary : 00 00 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
Erreur : Signature invalide
```

Le Receiver doit rester actif. Relancer ensuite l'émetteur normal pour confirmer qu'il accepte toujours les messages valides.

## 10. Rapport de validation

| Identifiant | Test | Critère d'acceptation |
|---|---|---|
| TEST-001 | Encodage | 16 octets conformes |
| TEST-002 | Décodage | Media ID=1, Year=2024 |
| TEST-003 | Signature incorrecte | Rejet |
| TEST-004 | Version incorrecte | Rejet |
| TEST-005 | Type incorrect | Rejet |
| TEST-006 | Longueur incorrecte | Rejet |
| TEST-007 | Message incomplet | Rejet |
| TEST-008 | Communication UDP | Message reçu et décodé |
| TEST-009 | Erreur UDP | Receiver toujours actif |

Ces résultats sont attendus et doivent être vérifiés lors de l'exécution : ils ne constituent pas un rapport de tests déjà exécutés.

## 11. À retenir

- Tests de conformité : format et valeurs binaires.
- Tests de décodage : données métier.
- Tests d'intégration : échange UDP entre applications.
- Tests de robustesse : rejet d'un message incorrect sans interrompre le Receiver.
- Le code de sortie signale un éventuel échec pour l'intégration continue.

## Prochaine étape

008 - Packaging et livraison Media Protocol : organisation de `media-protocol.jar`, `media-emitter.jar` et `media-receiver.jar` sans Maven.
