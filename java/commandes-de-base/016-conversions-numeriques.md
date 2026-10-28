# 016 - Conversions numériques en Java 8

## Les types

| Type | Bits | Domaine / précision |
|---|---:|---|
| `byte` | 8 | -128 à 127 |
| `short` | 16 | -32 768 à 32 767 |
| `char` | 16 | 0 à 65 535, unité UTF-16 non signée |
| `int` | 32 | -2 147 483 648 à 2 147 483 647 |
| `long` | 64 | -2^63 à 2^63 - 1 |
| `float` | 32 | IEEE 754, environ 6 à 9 chiffres significatifs |
| `double` | 64 | IEEE 754, environ 15 à 17 chiffres significatifs |

`boolean` ne se convertit pas en type numérique.

## Toutes les conversions implicites (widening)

| Source | Types cibles sans cast |
|---|---|
| `byte` | `short`, `int`, `long`, `float`, `double` |
| `short` | `int`, `long`, `float`, `double` |
| `char` | `int`, `long`, `float`, `double` |
| `int` | `long`, `float`, `double` |
| `long` | `float`, `double` |
| `float` | `double` |
| `double` | aucune |

Les conversions rétrécissantes demandent généralement un cast explicite, y compris les conversions entre `char` et `byte` ou `short`. Une conversion implicite vers `float` ou `double` peut arrondir.

```java
byte a = 42;
short b = a;
int c = b;
long d = c;
float e = d;
double f = e;
```

## Casts vers les entiers : débordement et troncature

```java
public class Main {
    public static void main(String[] args) {
        System.out.println((byte) 130);
        System.out.println((int) 2147483648L);
        System.out.println((int) 12.99);
        System.out.println((int) -12.99);
        System.out.println((int) Double.NaN);
        System.out.println((int) Double.POSITIVE_INFINITY);
        System.out.println((int) Double.NEGATIVE_INFINITY);
        System.out.println((byte) 130.9);
    }
}
```

Résultats dans l'ordre : `-126`, `-2147483648`, `12`, `-12`, `0`, `2147483647`, `-2147483648`, `-126`.

Entier -> entier plus petit : bits de poids fort supprimés, sans exception. Flottant -> `int` ou `long` : troncature vers zéro, `NaN -> 0`, valeurs infinies / trop grandes saturées aux bornes. Vers `byte`, `short` ou `char`, la conversion entière intermédiaire est suivie d'un rétrécissement.

## Arrondis

```java
System.out.println((int) 12.6);
System.out.println(Math.round(12.6));
System.out.println(Math.floor(12.6));
System.out.println(Math.ceil(12.6));
System.out.println(Math.rint(12.5));
System.out.println(Math.round(-12.5));
```

Résultats : `12`, `13`, `12.0`, `13.0`, `12.0`, `-12`. `Math.round(float)` retourne un `int`, `Math.round(double)` un `long`. `rint` arrondit vers le pair en cas d'égalité; `round` ne signifie pas systématiquement « loin de zéro ».

## Précision des flottants

```java
int n = 16777217;
float a = n;
double b = n;
System.out.println(a == n);
System.out.println(b == n);
System.out.println(0.1 + 0.2);
```

Affiche `false`, `true`, `0.30000000000000004`. Tous les entiers sont exactement représentables en `float` jusqu'à 2^24 et en `double` jusqu'à 2^53; les grands entiers peuvent être arrondis même lors d'un widening.

Cas particuliers : `Float.NaN`, `Double.NaN`, `POSITIVE_INFINITY`, `NEGATIVE_INFINITY`, `-0.0`. `Double.NaN == Double.NaN` vaut `false`; tester avec `Double.isNaN(x)` et `Double.isInfinite(x)`.

## Promotion arithmétique

```java
byte a = 10;
byte b = 20;
int somme = a + b;
byte petit = (byte) (a + b);
double quotient1 = 5 / 2;
double quotient2 = 5.0 / 2;
int grand = 2000000000;
long mauvais = grand * 2;
long correct = (long) grand * 2;
```

Les calculs sur `byte`, `short` et `char` produisent généralement des `int`. Promotion binaire : `double`, sinon `float`, sinon `long`, sinon `int`. Résultats : `quotient1 = 2.0`, `quotient2 = 2.5`, `mauvais = -294967296`, `correct = 4000000000`.

`byte x = 127; x += 1;` compile et donne `-128`; `x = x + 1` exige un cast. En Java, la division entière par zéro lance `ArithmeticException`; la division flottante par zéro peut produire `Infinity` ou `NaN`.

## Constantes et littéraux

```java
byte a = 127;
short b = 32000;
char c = 65;
long d = 42L;
float e = 3.14f;
double f = 3.14;
int hex = 0xFF;
int bin = 0b1010;
int lisible = 1_000_000;
final int valeur = 100;
byte petit = valeur;
```

Une constante entière `int` connue à la compilation et située dans la plage cible peut être assignée à `byte`, `short` ou `char` sans cast. Ce n'est pas vrai pour une variable `int` ordinaire.

## char : code numérique et Unicode

```java
char lettre = 'A';
int code = lettre;
char suivante = (char) (lettre + 1);
System.out.println(code);
System.out.println(suivante);
```

Affiche `65` puis `B`. Un `char` est une unité UTF-16, pas forcément un point de code Unicode complet. Utiliser `String.codePoints()` pour les caractères supplémentaires.

## Wrappers, Number, boxing et unboxing

```java
Integer objet = 42;
int primitif = objet;
Number nombre = objet;
long a = nombre.longValue();
float b = nombre.floatValue();
double c = nombre.doubleValue();
```

Wrappers : `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`. Tous sauf `Character` héritent de `Number`. `Long l = 42;` ne compile pas : écrire `42L` ou `Long.valueOf(42)`. Unboxing de `null` lève `NullPointerException`. Un cast `(Long) (Object) Integer.valueOf(42)` ne convertit pas le nombre : `ClassCastException`.

## String vers nombre et inversement

```java
byte a = Byte.parseByte("12");
short b = Short.parseShort("123");
int c = Integer.parseInt("1234");
long d = Long.parseLong("123456");
float e = Float.parseFloat("1.5");
double f = Double.parseDouble("1.5");
int hex = Integer.parseInt("FF", 16);
int bin = Integer.parseInt("1010", 2);
String texte = String.valueOf(c);
String hexadecimal = Integer.toHexString(255);
Integer objet = Integer.valueOf("42");
```

`parseXxx` retourne un primitif, `valueOf` un wrapper. Un nombre entier incorrect ou hors limites provoque `NumberFormatException`; `parseInt` n'accepte pas directement espaces et virgules. `Float.parseFloat` et `Double.parseDouble` acceptent notamment `NaN` et `Infinity` et peuvent produire une infinité pour un nombre hors plage.

## Entiers non signés en Java 8

```java
int bits = -1;
long positif = Integer.toUnsignedLong(bits);
System.out.println(positif);
System.out.println(Integer.toUnsignedString(bits));
int n = Integer.parseUnsignedInt("4294967295");
```

Affiche `4294967295` deux fois. Java 8 fournit `parseUnsignedInt`, `parseUnsignedLong`, `toUnsignedString`, `compareUnsigned` et `divideUnsigned` pour traiter des motifs binaires non signés.

## BigDecimal : calcul décimal exact

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        BigDecimal a = new BigDecimal("0.10");
        BigDecimal b = new BigDecimal("0.20");
        System.out.println(a.add(b));
        System.out.println(new BigDecimal("10").divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP));
        System.out.println(new BigDecimal("42.00").intValueExact());
    }
}
```

Résultats : `0.30`, `3.33`, `42`. Préférer un constructeur depuis une `String` ou `BigDecimal.valueOf(double)` à `new BigDecimal(0.1)`. `intValue()` peut tronquer; `intValueExact()` lève `ArithmeticException` si la valeur possède une fraction non nulle ou dépasse la plage. Une division non exacte sans arrondi explicite peut aussi lever une exception.

## BigInteger : très grands entiers

```java
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        BigInteger a = new BigInteger("999999999999999999999999");
        BigInteger b = BigInteger.valueOf(2);
        System.out.println(a.multiply(b));
        System.out.println(a.longValue());
        try {
            System.out.println(a.longValueExact());
        } catch (ArithmeticException e) {
            System.out.println("Hors limites long");
        }
    }
}
```

`longValue()` perd les bits trop grands; `longValueExact()` vérifie. `BigInteger` et `BigDecimal` sont immuables.

## Contrôle des débordements

```java
try {
    int a = Math.addExact(Integer.MAX_VALUE, 1);
} catch (ArithmeticException e) {
    System.out.println("Overflow");
}
try {
    int b = Math.toIntExact(2147483648L);
} catch (ArithmeticException e) {
    System.out.println("Hors limites int");
}
```

`Math.addExact`, `subtractExact`, `multiplyExact`, `incrementExact`, `decrementExact`, `negateExact` et `toIntExact` existent en Java 8. Pour `byte` et `short`, vérifier la plage avant un cast.

## Comparaison et formatage

```java
System.out.println(Double.compare(0.1 + 0.2, 0.3));
System.out.printf(java.util.Locale.US, "%.2f%n", 12.345);
```

Les flottants ne doivent pas être comparés avec `==` lorsqu'une tolérance métier est nécessaire. Un epsilon absolu ou relatif doit être choisi selon l'échelle du problème. `String.format(Locale.FRANCE, "%.2f", 12.5)` utilise une virgule décimale pour l'affichage, mais ne change pas la syntaxe de `Double.parseDouble`. Pour parser une entrée localisée, consulter `NumberFormat` et vérifier la consommation complète de l'entrée.

## Tableau de décision

| Besoin | Technique |
|---|---|
| `int -> long` | Affectation implicite |
| `long -> int` sûr | `Math.toIntExact` |
| `double -> int` | Cast, puis vérifier plage et perte |
| `double -> entier arrondi` | `Math.round` ou `BigDecimal` |
| `byte/short -> int` | Implicite |
| `int -> byte/short` | Contrôle de plage et cast |
| `char -> int` | Implicite |
| `int -> char` | Vérifier 0..65535 et cast |
| `int/long -> float/double` | Implicite, précision à surveiller |
| `String -> int/long` | `parseInt` / `parseLong` |
| `String -> float/double` | `parseFloat` / `parseDouble` |
| `Integer -> long` | Unboxing puis widening ou `longValue` |
| Calcul financier décimal | `BigDecimal` |
| Entier au-delà de 64 bits | `BigInteger` |

## Compiler et exécuter

Copier un exemple autonome dans `Main.java` :

```bash
javac -source 8 -target 8 Main.java
java Main
```

Voir également [015 - Casting](015-casting.md).
