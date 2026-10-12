# Signedness

## Définition

La **signedness** indique si un type entier est **signé** ou **non signé**.

- **Signed** : représente des nombres négatifs, zéro et positifs.
- **Unsigned** : représente uniquement zéro et des nombres positifs.

Avec le même nombre de bits, les deux représentations offrent le même nombre de combinaisons, mais pas la même plage de valeurs.

## Exemple sur 8 bits

| Représentation | Minimum | Maximum |
|---|---:|---:|
| Signed | -128 | 127 |
| Unsigned | 0 | 255 |

Pour la suite de bits `11111111` :

- Signed (complément à deux) : `-1`
- Unsigned : `255`

Les bits ne changent pas. Seule leur interprétation change.

## Types entiers Java 8

| Type | Taille | Représentation |
|---|---|---|
| `byte` | 8 bits | Signed |
| `short` | 16 bits | Signed |
| `int` | 32 bits | Signed |
| `long` | 64 bits | Signed |
| `char` | 16 bits | Unsigned |

Java 8 ne fournit pas de types primitifs `unsigned byte`, `unsigned short`, `unsigned int` ou `unsigned long`. Il propose néanmoins des méthodes pour interpréter certaines valeurs comme non signées.

## Exemple Java 8

```java
public class Main {
    public static void main(String[] args) {
        byte value = (byte) 255;

        System.out.println(value);
        System.out.println(Byte.toUnsignedInt(value));
    }
}
```

Compilation et exécution :

```bash
javac Main.java
java Main
```

Résultat :

```text
-1
255
```

La conversion conserve les mêmes 8 bits et les interprète comme un entier non signé.

## Application aux médias

Une application transmet l'identifiant numérique d'un média sur un octet :

```text
Identifiant : 200
Binaire     : 11001000
```

Si Java lit cet octet dans un `byte` signé, la valeur affichée est `-56`.

```java
byte mediaId = (byte) 200;
int unsignedMediaId = Byte.toUnsignedInt(mediaId);

System.out.println(mediaId);
System.out.println(unsignedMediaId);
```

Résultat :

```text
-56
200
```

Pour retrouver l'identifiant correct, il faut interpréter cet octet comme non signé.

## Application à UDP

Un port UDP est un entier **non signé sur 16 bits**, compris entre `0` et `65535`.

En Java, les ports sont manipulés avec un `int`, car un `short` signé ne couvre que `-32768` à `32767`.

Le port est ensuite encodé sur 2 octets dans l'en-tête UDP.

## Signedness et Endianness

| Notion | Signification |
|---|---|
| Signedness | Interprétation signée ou non signée d'un entier |
| Endianness | Ordre des octets d'une valeur sur plusieurs octets |

Ces deux notions sont indépendantes. L'ordre des octets ne détermine pas si un entier est signé.

## À retenir

**Signed** : peut représenter des nombres négatifs.

**Unsigned** : ne représente pas de nombres négatifs.

En Java 8, `Byte.toUnsignedInt()` permet de lire correctement un octet représentant une valeur entre `0` et `255`.
