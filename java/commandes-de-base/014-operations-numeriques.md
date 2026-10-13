# 014 - Opérations numériques en Java 8

## 1. Types numériques

| Type | Taille | Utilisation |
|---|---|---|
| `byte` | 8 bits | Petit entier signé |
| `short` | 16 bits | Entier signé |
| `int` | 32 bits | Entier signé |
| `long` | 64 bits | Grand entier signé |
| `float` | 32 bits | Décimal en virgule flottante |
| `double` | 64 bits | Décimal en virgule flottante, plus précis |

## 2. Opérateurs arithmétiques

| Opérateur | Opération | Exemple | Résultat |
|---|---|---|---|
| `+` | Addition | `10 + 3` | 13 |
| `-` | Soustraction | `10 - 3` | 7 |
| `*` | Multiplication | `10 * 3` | 30 |
| `/` | Division entière | `10 / 3` | 3 |
| `%` | Reste (modulo) | `10 % 3` | 1 |

```java
public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}
```

Résultat :

```text
13
7
30
3
1
```

## 3. Division entière

Deux opérandes entiers produisent une division entière : la partie fractionnaire est supprimée vers zéro, sans arrondi.

```java
System.out.println(9 / 2);
System.out.println(10 / 3);
System.out.println(11 / 4);
System.out.println(-10 / 3);
```

```text
4
3
2
-3
```

## 4. Division décimale

Utiliser au moins un opérande `double` ou `float`.

```java
double result = 10.0 / 3;
System.out.println(result);
```

```text
3.3333333333333335
```

Avec des variables entières :

```java
int a = 10;
int b = 3;
double result = (double) a / b;
System.out.println(result);
```

Attention : `double result = 10 / 3;` donne `3.0`, car la division entière est déjà effectuée.

## 5. Modulo : reste d'une division

```java
int result = 10 % 3;
System.out.println(result);
```

```text
1
```

En effet : `10 = 3 * 3 + 1`.

| Expression | Reste |
|---|---|
| `10 % 2` | 0 |
| `10 % 3` | 1 |
| `10 % 4` | 2 |
| `10 % 5` | 0 |
| `17 % 5` | 2 |
| `100 % 60` | 40 |

En Java, `%` est l'opérateur de **reste** et peut produire une valeur négative :

```java
System.out.println(-10 % 3);
System.out.println(Math.floorMod(-10, 3));
```

```text
-1
2
```

Avec un diviseur strictement positif, `Math.floorMod` fournit un résultat entre zéro inclus et le diviseur exclu.

## 6. Tester pair ou impair

```java
public class Main {
    public static void main(String[] args) {
        int number = 15;

        if (number % 2 == 0) {
            System.out.println("Pair");
        } else {
            System.out.println("Impair");
        }
    }
}
```

```text
Impair
```

## 7. Répéter un cycle avec le modulo

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 12; i++) {
            System.out.println(i % 5);
        }
    }
}
```

```text
0
1
2
3
4
0
1
2
3
4
0
1
```

## 8. Quotient et reste : minutes et secondes

```java
int seconds = 125;
int minutes = seconds / 60;
int remainingSeconds = seconds % 60;

System.out.println(minutes + " minutes");
System.out.println(remainingSeconds + " secondes");
```

```text
2 minutes
5 secondes
```

## 9. Incrémentation et affectations composées

| Opérateur | Rôle |
|---|---|
| `++` | Ajouter 1 |
| `--` | Retirer 1 |
| `+=` | Ajouter |
| `-=` | Soustraire |
| `*=` | Multiplier |
| `/=` | Diviser |
| `%=` | Garder le reste |

```java
int number = 10;
number++;
number += 5;
number -= 3;
number *= 2;
number /= 4;
number %= 3;
System.out.println(number);
```

```text
0
```

## 10. Classe Math et arrondis

| Méthode | Rôle |
|---|---|
| `Math.round()` | Entier le plus proche selon les règles Java |
| `Math.floor()` | Vers moins l'infini |
| `Math.ceil()` | Vers plus l'infini |
| `Math.abs()` | Valeur absolue |
| `Math.max()` | Maximum |
| `Math.min()` | Minimum |
| `Math.pow()` | Puissance |
| `Math.sqrt()` | Racine carrée |

```java
System.out.println(Math.round(12.7));
System.out.println(Math.floor(12.7));
System.out.println(Math.ceil(12.2));
System.out.println(Math.abs(-15));
System.out.println(Math.max(10, 20));
System.out.println(Math.min(10, 20));
System.out.println(Math.pow(2, 3));
System.out.println(Math.sqrt(81));
```

```text
13
12.0
13.0
15
20
10
8.0
9.0
```

## 11. Pourcentages

Calculer 20 % de 150 :

```java
double total = 150;
double percentage = 20;
double result = total * percentage / 100;
System.out.println(result);
```

```text
30.0
```

Calculer la part de 30 sur un total de 150 :

```java
double amount = 30;
double total = 150;
double percentage = amount / total * 100;
System.out.println(percentage);
```

```text
20.0
```

Le total doit être non nul pour qu'un pourcentage soit défini.

## 12. Conversions numériques

Conversion implicite :

```java
int number = 10;
double result = number;
```

Conversion explicite :

```java
double number = 12.9;
int result = (int) number;
System.out.println(result);
```

```text
12
```

Le cast vers `int` tronque la partie fractionnaire vers zéro. Les conversions réductrices peuvent perdre de la précision ou modifier la valeur.

## 13. Division par zéro

Division entière :

```java
int result = 10 / 0;
```

Lance `ArithmeticException` à l'exécution.

Division flottante :

```java
double result = 10.0 / 0.0;
System.out.println(result);
```

```text
Infinity
```

Une division `0.0 / 0.0` retourne `NaN`. Un reste entier `10 % 0` lance aussi `ArithmeticException`.

## 14. Priorité des opérations

| Priorité | Opérations |
|---|---|
| Haute | Parenthèses |
| Moyenne | `*`, `/`, `%` |
| Basse | `+`, `-` |

```java
System.out.println(10 + 5 * 2);
System.out.println((10 + 5) * 2);
```

```text
20
30
```

## 15. Précision des décimaux

```java
System.out.println(0.1 + 0.2);
```

```text
0.30000000000000004
```

`float` et `double` utilisent des valeurs binaires approximatives. Pour les montants monétaires, préférer `BigDecimal`, notamment avec un constructeur recevant une chaîne :

```java
import java.math.BigDecimal;

BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");
System.out.println(a.add(b));
```

```text
0.3
```

Les types entiers peuvent également déborder. Pour détecter certains débordements en Java 8, utiliser par exemple `Math.addExact` et `Math.multiplyExact`.

## 16. Compilation et exécution

Placer un exemple autonome dans `Main.java` :

```bash
javac Main.java
java Main
```

## 17. À retenir

| Besoin | Solution |
|---|---|
| Addition, soustraction, multiplication | `+`, `-`, `*` |
| Division entière | `/` entre entiers |
| Division décimale | `/` avec `double` |
| Reste de division | `%` |
| Tester la parité | `number % 2 == 0` |
| Quotient et reste | `a / b`, `a % b` |
| Arrondir | `Math.round()` |
| Valeur absolue | `Math.abs()` |
| Puissance | `Math.pow()` |
| Pourcentage | `amount / total * 100` |
| Conversion | `(int)`, `(double)` |
| Modulo mathématique pour diviseur positif | `Math.floorMod()` |
