# Tests binaires avec JUnit 4

## 1. Objectif

Tester l'encodage et le décodage d'un message binaire en Java 8.

Le message représente un média avec :

- un identifiant entier signé de 32 bits ;
- une durée entière signée de 16 bits.

Environnement :

- Java 8
- JUnit 4.13.2
- Sans Maven
- Sans Gradle

## 2. Format du message

| Champ | Type Java | Taille | Ordre |
|---|---|---|---|
| Identifiant | `int` | 4 octets | Big-endian |
| Durée | `short` | 2 octets | Big-endian |
| Total | | 6 octets | |

Exemple :

```text
id = 258
duration = 120

00 00 01 02 00 78
```

En big-endian, l'octet de poids fort est placé en premier.

Les entiers Java `int` et `short` sont signés, avec une représentation en complément à deux.

## 3. Arborescence

```text
java-binary-test/
├── lib/
│   ├── junit-4.13.2.jar
│   └── hamcrest-core-1.3.jar
├── src/
│   ├── MediaMessage.java
│   ├── MediaCodec.java
│   └── MediaCodecTest.java
└── build/
```

## 4. Classe MediaMessage.java

Créer `src/MediaMessage.java`.

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

Créer `src/MediaCodec.java`.

```java
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class MediaCodec {

    public static final int MESSAGE_SIZE = 6;

    public byte[] encode(MediaMessage message) {
        if (message == null) {
            throw new IllegalArgumentException("Message null");
        }

        ByteBuffer buffer = ByteBuffer.allocate(MESSAGE_SIZE);
        buffer.order(ByteOrder.BIG_ENDIAN);
        buffer.putInt(message.getId());
        buffer.putShort(message.getDuration());

        return buffer.array();
    }

    public MediaMessage decode(byte[] data) {
        if (data == null || data.length != MESSAGE_SIZE) {
            throw new IllegalArgumentException("Taille du message invalide");
        }

        ByteBuffer buffer = ByteBuffer.wrap(data);
        buffer.order(ByteOrder.BIG_ENDIAN);

        int id = buffer.getInt();
        short duration = buffer.getShort();

        return new MediaMessage(id, duration);
    }
}
```

`putInt()` écrit 4 octets, `putShort()` en écrit 2. Les méthodes `getInt()` et `getShort()` réalisent l'opération inverse.

## 6. Classe MediaCodecTest.java

Créer `src/MediaCodecTest.java`.

```java
import org.junit.Test;

import static org.junit.Assert.*;

public class MediaCodecTest {

    private final MediaCodec codec = new MediaCodec();

    @Test
    public void testEncodeBigEndian() {
        MediaMessage message = new MediaMessage(258, (short) 120);

        byte[] actual = codec.encode(message);

        byte[] expected = {
            0x00, 0x00, 0x01, 0x02, 0x00, 0x78
        };

        assertArrayEquals(expected, actual);
    }

    @Test
    public void testDecodeBigEndian() {
        byte[] data = {
            0x00, 0x00, 0x01, 0x02, 0x00, 0x78
        };

        MediaMessage message = codec.decode(data);

        assertEquals(258, message.getId());
        assertEquals(120, message.getDuration());
    }

    @Test
    public void testSignedValues() {
        MediaMessage source = new MediaMessage(-1, (short) -2);

        byte[] actual = codec.encode(source);

        byte[] expected = {
            (byte) 0xFF, (byte) 0xFF,
            (byte) 0xFF, (byte) 0xFF,
            (byte) 0xFF, (byte) 0xFE
        };

        assertArrayEquals(expected, actual);

        MediaMessage decoded = codec.decode(actual);

        assertEquals(-1, decoded.getId());
        assertEquals(-2, decoded.getDuration());
    }

    @Test
    public void testRoundTrip() {
        MediaMessage source = new MediaMessage(5000, (short) 125);

        MediaMessage decoded = codec.decode(codec.encode(source));

        assertEquals(source.getId(), decoded.getId());
        assertEquals(source.getDuration(), decoded.getDuration());
    }

    @Test
    public void testMinimumAndMaximumValues() {
        MediaMessage source = new MediaMessage(
            Integer.MAX_VALUE,
            Short.MIN_VALUE
        );

        MediaMessage decoded = codec.decode(codec.encode(source));

        assertEquals(Integer.MAX_VALUE, decoded.getId());
        assertEquals(Short.MIN_VALUE, decoded.getDuration());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDecodeInvalidSize() {
        codec.decode(new byte[5]);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDecodeNull() {
        codec.decode(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testEncodeNull() {
        codec.encode(null);
    }
}
```

## 7. Comprendre les vérifications

| Test | Vérification |
|---|---|
| `testEncodeBigEndian` | Ordre exact des six octets |
| `testDecodeBigEndian` | Lecture des valeurs à partir d'octets connus |
| `testSignedValues` | Complément à deux pour les négatifs |
| `testRoundTrip` | Encodage suivi d'un décodage |
| `testMinimumAndMaximumValues` | Valeurs limites des types Java |
| `testDecodeInvalidSize` | Rejet d'un message trop court |
| `testDecodeNull` | Rejet d'un tableau nul |
| `testEncodeNull` | Rejet d'un objet nul |

Le test sur les octets exacts est indispensable : un simple aller-retour encode/décode pourrait réussir même si l'encodeur et le décodeur utilisent tous les deux le mauvais ordre d'octets.

### Signedness

```java
(byte) 0xFF
```

En Java, `byte` est signé : `0xFF` représente donc `-1` une fois converti en `byte`.

Pour l'interpréter comme une valeur non signée entre 0 et 255 :

```java
int unsigned = data[0] & 0xFF;
```

## 8. Installation de JUnit

Télécharger :

- [JUnit 4.13.2](https://repo.maven.apache.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar)
- [Hamcrest Core 1.3](https://repo.maven.apache.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar)

Placer les deux JAR dans `lib`.

## 9. Compilation

Windows :

```bat
mkdir build
javac -cp "lib/*" -d build src\MediaMessage.java src\MediaCodec.java src\MediaCodecTest.java
```

Linux :

```bash
mkdir -p build
javac -cp "lib/*" -d build src/*.java
```

## 10. Exécution des tests

Windows :

```bat
java -cp "build;lib/*" org.junit.runner.JUnitCore MediaCodecTest
```

Linux :

```bash
java -cp "build:lib/*" org.junit.runner.JUnitCore MediaCodecTest
```

Résultat attendu (durée indicative) :

```text
JUnit version 4.13.2
........
Time: 0.01

OK (8 tests)
```

## 11. Provoquer un échec

Dans `MediaCodec.encode()`, remplacer :

```java
buffer.order(ByteOrder.BIG_ENDIAN);
```

par :

```java
buffer.order(ByteOrder.LITTLE_ENDIAN);
```

Le test `testEncodeBigEndian` échoue : les octets produits ne correspondent plus au format attendu.

Le test `testRoundTrip` peut cependant continuer à réussir, car l'encodage et le décodage sont deux opérations distinctes : si les deux utilisent accidentellement le même ordre incorrect, l'aller-retour ne suffit pas à détecter le problème.

## 12. À retenir

- `ByteBuffer` permet de lire et écrire des données binaires.
- `ByteOrder.BIG_ENDIAN` rend l'ordre des octets explicite.
- `int` occupe 4 octets et `short` 2 octets.
- `assertArrayEquals()` vérifie exactement le contenu binaire.
- Les valeurs négatives sont représentées en complément à deux.
- Un test aller-retour ne remplace pas les tests sur des octets de référence.
- La validation de la taille du message protège le décodage.
