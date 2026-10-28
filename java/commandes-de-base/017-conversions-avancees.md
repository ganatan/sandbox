# 017 - Conversions avancées entre int, long, float et double (Java 8)

Ce tutoriel complète les fiches [015](015-casting.md) et [016](016-conversions-numeriques.md). Les exemples sont conçus pour Java 8 et sont indépendants sauf indication contraire.

## 1. Matrice complète des primitives

| De / vers | byte | short | char | int | long | float | double |
|---|---|---|---|---|---|---|---|
| byte | = | auto | cast | auto | auto | auto | auto |
| short | cast | = | cast | auto | auto | auto | auto |
| char | cast | cast | = | auto | auto | auto | auto |
| int | cast | cast | cast | = | auto | auto | auto |
| long | cast | cast | cast | cast | = | auto | auto |
| float | cast | cast | cast | cast | cast | = | auto |
| double | cast | cast | cast | cast | cast | cast | = |

`auto` : conversion implicite, **pas nécessairement exacte**. `cast` : conversion explicite par `(type)`. `boolean` n'est convertible en aucun numérique.

| Type | Taille | Plage / précision |
|---|---|---|
| byte | 8 bits | -128 à 127 |
| short | 16 bits | -32768 à 32767 |
| char | 16 bits | 0 à 65535, unité UTF-16 non signée |
| int | 32 bits | -2^31 à 2^31-1 |
| long | 64 bits | -2^63 à 2^63-1 |
| float | 32 bits | IEEE 754, 24 bits de significande |
| double | 64 bits | IEEE 754, 53 bits de significande |

## 2. Widening : int vers long, float, double

```java
public class Main {
    public static void main(String[] args) {
        int value = 16777217;
        long l = value;
        float f = value;
        double d = value;
        System.out.println(l);
        System.out.println(f);
        System.out.println(d);
        System.out.println((int) f == value);
    }
}
```

Résultats : `16777217`, `1.6777216E7`, `1.6777217E7`, `false`. Tous les entiers jusqu'à 2^24 sont exacts en float, jusqu'à 2^53 en double; au-delà, certains entiers restent représentables, pas tous.

```java
long value = 9007199254740993L;
double approximate = value;
System.out.println(approximate);
System.out.println((long) approximate == value);
```

Résultats : `9.007199254740992E15` et `false`. `long -> double` est implicite mais peut perdre de l'information.

## 3. Narrowing : float/double vers int/long

```java
public class Main {
    public static void main(String[] args) {
        System.out.println((int) 12.99);
        System.out.println((int) -12.99);
        System.out.println((int) Double.NaN);
        System.out.println((int) Double.POSITIVE_INFINITY);
        System.out.println((int) Double.NEGATIVE_INFINITY);
        System.out.println((long) Double.POSITIVE_INFINITY);
        System.out.println((int) 1.0e100);
    }
}
```

Résultats : `12`, `-12`, `0`, `2147483647`, `-2147483648`, `9223372036854775807`, `2147483647`.

Règle Java : troncature vers zéro, NaN -> 0, saturation aux bornes de int/long en cas de dépassement; pas d'exception. Vers byte/short/char, la conversion en int est ensuite rétrécie.

## 4. Vérifier les conversions avant le cast

```java
public class Main {
    public static void main(String[] args) {
        double value = 42.0;
        if (Double.isFinite(value)
                && value >= Integer.MIN_VALUE
                && value < 2147483648.0
                && value == Math.rint(value)) {
            int exact = (int) value;
            System.out.println(exact);
        }
        double large = 123456789.0;
        if (Double.isFinite(large) && large >= -0x1.0p63 && large < 0x1.0p63
                && large == Math.rint(large)) {
            long exact = (long) large;
            System.out.println(exact);
        }
    }
}
```

`Long.MAX_VALUE` converti en double s'arrondit à 2^63 : comparer `double <= Long.MAX_VALUE` ne sécurise donc pas un cast vers long. La vérification ci-dessus assure que la valeur **déjà stockée dans le double** est entière et dans la plage, pas qu'un entier antérieur a été préservé.

## 5. Rétrécissement entier et débordement

```java
System.out.println((byte) 130);
System.out.println((short) 65535);
System.out.println((char) -1 == '\uFFFF');
System.out.println((int) 2147483648L);
```

Résultats : `-126`, `-1`, `true`, `-2147483648`. Les bits de poids fort sont perdus, sans exception.

```java
int n = 200;
if (n >= Byte.MIN_VALUE && n <= Byte.MAX_VALUE) {
    byte b = (byte) n;
}
```

## 6. Arrondir correctement

| Expression | Positif 2.5 | Négatif -2.5 |
|---|---:|---:|
| (int) | 2 | -2 |
| Math.round(double) | 3 | -2 |
| Math.floor | 2.0 | -3.0 |
| Math.ceil | 3.0 | -2.0 |
| Math.rint | 2.0 | -2.0 |

```java
double value = -2.5;
System.out.println((int) value);
System.out.println(Math.round(value));
System.out.println(Math.floor(value));
System.out.println(Math.ceil(value));
System.out.println(Math.rint(value));
```

`Math.round(float)` retourne int; `Math.round(double)` retourne long. `rint` arrondit les égalités vers l'entier pair. Pour des montants financiers, utiliser `BigDecimal` avec un `RoundingMode` choisi explicitement.

## 7. Division, promotion et dépassement

```java
public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 2;
        double faux = a / b;
        double bon = (double) a / b;
        long fauxProduit = 2000000000 * 2;
        long bonProduit = 2000000000L * 2;
        byte x = 10;
        byte y = 20;
        int somme = x + y;
        System.out.println(faux);
        System.out.println(bon);
        System.out.println(fauxProduit);
        System.out.println(bonProduit);
        System.out.println(somme);
    }
}
```

Affiche `2.0`, `2.5`, `-294967296`, `4000000000`, `30`. Les opérations sur byte/short/char deviennent généralement int. Promotion binaire : double, sinon float, sinon long, sinon int.

```java
try {
    int checked = Math.addExact(Integer.MAX_VALUE, 1);
} catch (ArithmeticException e) {
    System.out.println("Overflow");
}
try {
    int checked = Math.toIntExact(2147483648L);
} catch (ArithmeticException e) {
    System.out.println("Hors limites int");
}
```

## 8. Flottants spéciaux et comparaison

```java
System.out.println(0.1 + 0.2 == 0.3);
System.out.println(Double.isNaN(0.0 / 0.0));
System.out.println(Double.isInfinite(1.0 / 0.0));
System.out.println(1.0 / -0.0);
System.out.println(Double.compare(-0.0, 0.0));
```

Résultats : `false`, `true`, `true`, `-Infinity`, `-1`. Ne pas tester NaN avec `==`. Une tolérance de comparaison doit être adaptée à l'échelle et au métier.

`Float.MIN_VALUE` et `Double.MIN_VALUE` sont les plus petites valeurs **positives non nulles**, pas les valeurs négatives extrêmes.

## 9. String, wrappers, Number

```java
int i = Integer.parseInt("123");
long l = Long.parseLong("123456");
float f = Float.parseFloat("1.25");
double d = Double.parseDouble("1.25");
Integer integer = Integer.valueOf("123");
Double boxed = Double.valueOf("1.25");
String text = String.valueOf(d);
Number number = integer;
double converted = number.doubleValue();
```

`parseXxx` renvoie un primitif, `valueOf` un objet wrapper. Les erreurs de format entraînent `NumberFormatException`; un wrapper null déballé produit `NullPointerException`. `(Double) (Object) Integer.valueOf(42)` donne une `ClassCastException`, pas une conversion.

## 10. Décimaux exacts avec BigDecimal

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        BigDecimal a = new BigDecimal("0.10");
        BigDecimal b = new BigDecimal("0.20");
        BigDecimal c = BigDecimal.valueOf(12.345);
        System.out.println(a.add(b));
        System.out.println(c.setScale(2, RoundingMode.HALF_UP));
        System.out.println(new BigDecimal("42").intValueExact());
    }
}
```

Résultats : `0.30`, `12.35`, `42`. Préférer `new BigDecimal("0.1")` à `new BigDecimal(0.1)`. `intValueExact`/`longValueExact` signalent une fraction non nulle ou une valeur hors plage. Une division non exacte exige souvent un mode d'arrondi.

## 11. Temps, entiers et unités

```java
long epochMillis = -1L;
long seconds = Math.floorDiv(epochMillis, 1000L);
long remainderMillis = Math.floorMod(epochMillis, 1000L);
System.out.println(seconds);
System.out.println(remainderMillis);
```

Affiche `-1` et `999`. Contrairement à `/` et `%`, `floorDiv/floorMod` sont appropriés pour décomposer des timestamps négatifs.

## 12. Exercices et corrections

| Expression | Résultat | Raison |
|---|---|---|
| (int) 4.9 | 4 | Troncature |
| (int) -4.9 | -4 | Vers zéro |
| Math.round(4.5) | 5 | Arrondi |
| Math.round(-4.5) | -4 | Règle Java |
| (byte) 256 | 0 | Troncature à 8 bits |
| 5 / 2 | 2 | Division entière |
| 5 / 2.0 | 2.5 | Opération double |
| (float) 16777217 | 16777216.0 | Précision |
| Integer.parseInt("1.5") | NumberFormatException | Entier attendu |

## Exécution

Enregistrer un exemple complet dans `Main.java` :

```bash
javac -source 8 -target 8 Main.java
java Main
```

Les fragments isolés doivent être placés dans une méthode, par exemple `main`.
