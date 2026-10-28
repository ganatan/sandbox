# 018 - Dates, heures et conversions en Java 8

Ce guide couvre les principales transformations de dates, heures, timestamps, fuseaux et API héritées. Préférer `java.time` (Java 8) à `Date` et `Calendar` dans le nouveau code.

## 1. Quelle classe utiliser ?

| Classe | Représente |
|---|---|
| LocalDate | Date civile sans heure/fuseau |
| LocalTime | Heure sans date/fuseau |
| LocalDateTime | Date et heure **sans fuseau** |
| Instant | Instant absolu sur l'axe UTC |
| OffsetDateTime | Date/heure avec décalage fixe UTC |
| ZonedDateTime | Date/heure avec règles de fuseau régional |
| ZoneId | Région, ex. Europe/Paris |
| ZoneOffset | Décalage fixe, ex. +01:00 |
| Duration | Durée sur l'axe du temps |
| Period | Nombre d'années, mois et jours calendaires |
| Year, YearMonth, MonthDay | Dates partielles |
| java.util.Date, Calendar | API historiques mutables |

Une `LocalDateTime` seule ne représente **pas** un instant unique.

## 2. Créer, consulter, extraire

```java
import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 10, 28);
        LocalTime time = LocalTime.of(14, 30, 45);
        LocalDateTime local = LocalDateTime.of(date, time);
        ZonedDateTime paris = local.atZone(ZoneId.of("Europe/Paris"));
        Instant instant = paris.toInstant();
        System.out.println(date);
        System.out.println(time);
        System.out.println(local);
        System.out.println(paris);
        System.out.println(instant);
    }
}
```

`date.getYear()`, `date.getMonthValue()`, `date.getDayOfMonth()`, `time.getHour()`, `time.getMinute()`, `date.getDayOfWeek()`. `LocalDate.now()`, `LocalTime.now()`, `Instant.now()` utilisent l'horloge courante; préférer l'injection de `Clock` dans les tests.

## 3. LocalDate, LocalTime, LocalDateTime

```java
LocalDate date = LocalDate.of(2026, 10, 28);
LocalTime time = LocalTime.of(14, 30);
LocalDateTime dateTime = date.atTime(time);
LocalDate extractedDate = dateTime.toLocalDate();
LocalTime extractedTime = dateTime.toLocalTime();
LocalDateTime midnight = date.atStartOfDay();
LocalDateTime tomorrow = dateTime.plusDays(1);
```

Ces objets sont immuables : `plusDays`, `minusMonths`, `withDayOfMonth` retournent de nouveaux objets.

## 4. LocalDateTime vers Instant et retour

```java
LocalDateTime local = LocalDateTime.of(2026, 10, 28, 14, 30);
ZoneId zone = ZoneId.of("Europe/Paris");
Instant instant = local.atZone(zone).toInstant();
LocalDateTime restored = LocalDateTime.ofInstant(instant, zone);
OffsetDateTime offset = instant.atOffset(ZoneOffset.ofHours(1));
ZonedDateTime zoned = instant.atZone(zone);
```

La conversion vers `Instant` requiert les règles du fuseau ou un décalage UTC connu. `withZoneSameInstant` préserve l'instant, `withZoneSameLocal` préserve autant que possible l'heure affichée et peut changer l'instant.

## 5. Heure d'été : date inexistante ou ambiguë

```java
ZoneId zone = ZoneId.of("Europe/Paris");
LocalDateTime missing = LocalDateTime.of(2026, 3, 29, 2, 30);
ZonedDateTime adjusted = missing.atZone(zone);
LocalDateTime repeated = LocalDateTime.of(2026, 10, 25, 2, 30);
System.out.println(adjusted);
System.out.println(zone.getRules().getValidOffsets(repeated));
```

À Paris le 29 mars 2026 à 02:30 n'existe pas; `atZone` décale à 03:30. Le 25 octobre 2026 à 02:30 existe deux fois. `getValidOffsets` renvoie 0, 1 ou 2 décalages : à vérifier si le choix est critique. Ne pas supposer que « une journée » vaut toujours 24 heures.

## 6. Parser les chaînes ISO 8601

```java
LocalDate a = LocalDate.parse("2026-10-28");
LocalTime b = LocalTime.parse("14:30:45");
LocalDateTime c = LocalDateTime.parse("2026-10-28T14:30:45");
Instant d = Instant.parse("2026-10-28T13:30:45Z");
OffsetDateTime e = OffsetDateTime.parse("2026-10-28T14:30:45+01:00");
ZonedDateTime f = ZonedDateTime.parse("2026-10-28T14:30:45+01:00[Europe/Paris]");
String iso = d.toString();
```

Une date mal formée déclenche `DateTimeParseException`.

## 7. Format français, patterns et parsing strict

```java
import java.time.*;
import java.time.format.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/uuuu", Locale.FRANCE)
            .withResolverStyle(ResolverStyle.STRICT);
        LocalDate date = LocalDate.parse("28/10/2026", fmt);
        System.out.println(date.format(fmt));
        System.out.println(date.format(DateTimeFormatter.ofPattern("EEEE d MMMM uuuu", Locale.FRANCE)));
    }
}
```

| Pattern | Signification |
|---|---|
| dd | Jour du mois |
| MM / MMM / MMMM | Mois numérique / abrégé / complet |
| uuuu | Année (pratique en parsing STRICT) |
| yyyy | Année de l'ère |
| YYYY | Année de semaine : attention ! |
| HH / hh | Heure 0–23 / 1–12 |
| mm / ss | Minutes / secondes |
| SSS | Millisecondes affichées sur 3 chiffres |
| XXX | Décalage UTC |
| VV | Identifiant de fuseau |

Ne pas confondre MM avec mm. `ResolverStyle.STRICT` aide à rejeter les dates incohérentes.

## 8. Epoch seconds, millis, nanos

```java
Instant instant = Instant.ofEpochMilli(1700000000123L);
long millis = instant.toEpochMilli();
long seconds = instant.getEpochSecond();
int nanos = instant.getNano();
Instant reconstructed = Instant.ofEpochSecond(seconds, nanos);
```

Secondes et millisecondes depuis le 01/01/1970 00:00:00 UTC ne sont pas interchangeables. `getNano()` donne la fraction nanoseconde *dans la seconde*, pas des nanos depuis 1970. `System.currentTimeMillis()` donne les millisecondes de l'horloge système.

```java
long millis = -1L;
long seconds = Math.floorDiv(millis, 1000L);
long rest = Math.floorMod(millis, 1000L);
Instant instant = Instant.ofEpochSecond(seconds, rest * 1000000L);
```

## 9. Conversion Date <-> Instant <-> LocalDate

```java
import java.time.*;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        Date oldDate = new Date();
        Instant instant = oldDate.toInstant();
        Date again = Date.from(instant);
        ZoneId zone = ZoneId.of("Europe/Paris");
        LocalDate local = instant.atZone(zone).toLocalDate();
        Date midnight = Date.from(local.atStartOfDay(zone).toInstant());
        System.out.println(again);
        System.out.println(midnight);
    }
}
```

`Date` stocke un instant à la précision milliseconde, pas son fuseau d'origine. Le passage d'un `Instant` précis en nanos à `Date` perd une partie de la précision.

## 10. Calendar et TimeZone : compatibilité legacy

```java
import java.time.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Europe/Paris"));
        Instant instant = cal.toInstant();
        ZonedDateTime zoned = instant.atZone(cal.getTimeZone().toZoneId());
        GregorianCalendar legacy = GregorianCalendar.from(zoned);
        System.out.println(legacy.get(Calendar.YEAR));
        System.out.println(legacy.get(Calendar.MONTH) + 1);
    }
}
```

Dans Calendar, les mois vont de 0 à 11, contrairement à `LocalDate`. `Calendar` est mutable et peu adapté au nouveau code.

## 11. java.sql.Date, Time, Timestamp

```java
import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2026, 10, 28);
        LocalTime t = LocalTime.of(14, 30);
        LocalDateTime dt = LocalDateTime.of(d, t);
        java.sql.Date sqlDate = java.sql.Date.valueOf(d);
        java.sql.Time sqlTime = java.sql.Time.valueOf(t);
        java.sql.Timestamp stamp = java.sql.Timestamp.valueOf(dt);
        System.out.println(sqlDate.toLocalDate());
        System.out.println(sqlTime.toLocalTime());
        System.out.println(stamp.toLocalDateTime());
        Instant instant = stamp.toInstant();
        java.sql.Timestamp fromInstant = java.sql.Timestamp.from(instant);
        System.out.println(fromInstant);
    }
}
```

Attention : `java.sql.Timestamp.valueOf(LocalDateTime)` interprète une date-heure locale via les conventions de l'API historique; il ne faut pas l'assimiler à UTC. Pour une base SQL, préciser le type SQL, le pilote JDBC et le comportement de fuseau. JDBC 4.2 peut gérer plusieurs types `java.time` via `setObject`/`getObject`, selon le pilote.

## 12. Durées et périodes

```java
import java.time.*;

public class Main {
    public static void main(String[] args) {
        Instant a = Instant.parse("2026-10-28T10:00:00Z");
        Instant b = Instant.parse("2026-10-28T12:30:00Z");
        Duration duration = Duration.between(a, b);
        System.out.println(duration.toMinutes());
        LocalDate start = LocalDate.of(2026, 1, 31);
        LocalDate end = start.plusMonths(1);
        Period period = Period.between(start, end);
        System.out.println(end);
        System.out.println(period);
    }
}
```

`Duration` mesure le temps écoulé, `Period` des unités de calendrier. `plusMonths(1)` ajuste le jour s'il n'existe pas dans le nouveau mois.

## 13. Comparer, trier, mesurer

```java
LocalDate a = LocalDate.of(2026, 10, 28);
LocalDate b = LocalDate.of(2026, 12, 31);
System.out.println(a.isBefore(b));
System.out.println(a.isAfter(b));
System.out.println(a.equals(b));
System.out.println(java.time.temporal.ChronoUnit.DAYS.between(a, b));
```

Pour un instant, préférer `Instant.isBefore` / `isAfter`, pas des `LocalDateTime` appartenant à des zones différentes.

## 14. Minuit, début/fin de journée et UTC

```java
LocalDate date = LocalDate.of(2026, 10, 28);
ZoneId zone = ZoneId.of("Europe/Paris");
Instant startInclusive = date.atStartOfDay(zone).toInstant();
Instant endExclusive = date.plusDays(1).atStartOfDay(zone).toInstant();
System.out.println(startInclusive);
System.out.println(endExclusive);
```

Pour interroger une journée entière en base de données, utiliser `timestamp >= startInclusive AND timestamp < endExclusive`. Cela évite les problèmes de dernière milliseconde/nanoseconde et d'heure d'été.

## 15. Format HTTP, JSON et RFC 1123

```java
import java.time.*;
import java.time.format.*;

public class Main {
    public static void main(String[] args) {
        ZonedDateTime utc = Instant.parse("2026-10-28T13:30:00Z").atZone(ZoneOffset.UTC);
        String http = DateTimeFormatter.RFC_1123_DATE_TIME.format(utc);
        ZonedDateTime parsed = ZonedDateTime.parse(http, DateTimeFormatter.RFC_1123_DATE_TIME);
        System.out.println(http);
        System.out.println(parsed.toInstant());
    }
}
```

Pour des échanges JSON, privilégier un ISO 8601 explicite tel que `Instant.toString()` ou `OffsetDateTime.toString()`, avec un contrat documentant précisément le fuseau et les fractions.

## 16. Ancienne API SimpleDateFormat

```java
import java.text.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss", Locale.FRANCE);
        fmt.setLenient(false);
        fmt.setTimeZone(TimeZone.getTimeZone("Europe/Paris"));
        Date date = fmt.parse("28/10/2026 14:30:00");
        System.out.println(fmt.format(date));
    }
}
```

`SimpleDateFormat` est mutable et **non thread-safe**. `DateTimeFormatter` est immutable et thread-safe.

## 17. Erreurs classiques

| Erreur | Solution |
|---|---|
| Confondre secondes et millisecondes | Documenter les unités |
| LocalDateTime traité comme UTC | Attacher un ZoneId ou ZoneOffset |
| Mois Calendar décalé | Ajouter 1 en lecture de Calendar.MONTH |
| HH confondu avec hh | Préférer HH pour 0 à 23 |
| YYYY utilisé pour l'année civile | Utiliser uuuu |
| Ignorer heure d'été | Examiner ZoneRules et offsets valides |
| DateTimeParseException | Vérifier pattern, locale, valeur |
| DateTimeException | Vérifier dates, plages et fuseaux |
| Conversion Date vers LocalDate sans zone | Choisir la zone métier |
| Prendre une journée pour 86400 s | Définir durée vs calendrier |

## 18. Commandes

Chaque exemple autonome va dans `Main.java`. Pour les fragments, les intégrer dans une méthode :

```bash
javac -source 8 -target 8 Main.java
java Main
```

Pour la conversion des timestamps entiers et des flottants, voir aussi [017 - Conversions avancées](017-conversions-avancees.md).
