package com.ganatan.starter.api.root;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  enum Status {
    CREATED,
    RUNNING,
    FAILED
  }

  record User(String name, int age) {}

  @GetMapping("/")
  public Map<String, Object> root() {

    byte b = 1;
    short s = 2;
    int i = 3;
    long l = 4L;
    float f = 1.5f;
    double d = 2.5;
    char c = 'A';
    boolean bool = true;

    Byte wb = b;
    Short ws = s;
    Integer wi = i;
    Long wl = l;
    Float wf = f;
    Double wd = d;
    Character wc = c;
    Boolean wbool = bool;

    int[] intArray = {1, 2, 3};
    String[] stringArray = {"a", "b"};

    List<String> list = List.of("one", "two");
    Map<String, Integer> map = Map.of("a", 1, "b", 2);

    Optional<String> optional = Optional.of("value");

    BigInteger bigInteger = new BigInteger("123456789");
    BigDecimal bigDecimal = new BigDecimal("123.45");

    UUID uuid = UUID.randomUUID();

    Date legacyDate = new Date();
    Instant instant = Instant.now();
    LocalDate localDate = LocalDate.now();
    LocalTime localTime = LocalTime.now();
    LocalDateTime localDateTime = LocalDateTime.now();
    ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
    Duration duration = Duration.ofMinutes(90);
    Period period = Period.ofDays(10);

    Status status = Status.RUNNING;

    User user = new User("Alice", 30);

    return Map.of(
      "primitives", Map.of(
        "byte", b,
        "short", s,
        "int", i,
        "long", l,
        "float", f,
        "double", d,
        "char", String.valueOf(c),
        "boolean", bool
      ),
      "wrappers", Map.of(
        "Byte", wb,
        "Short", ws,
        "Integer", wi,
        "Long", wl,
        "Float", wf,
        "Double", wd,
        "Character", wc,
        "Boolean", wbool
      ),
      "arrays", Map.of(
        "intArray", intArray,
        "stringArray", stringArray
      ),
      "collections", Map.of(
        "list", list,
        "map", map
      ),
      "optional", optional.orElse(null),
      "big_numbers", Map.of(
        "BigInteger", bigInteger,
        "BigDecimal", bigDecimal
      ),
      "uuid", uuid.toString(),
      "date_time", Map.of(
        "legacy_date", legacyDate.toString(),
        "instant", instant.toString(),
        "local_date", localDate.toString(),
        "local_time", localTime.toString(),
        "local_date_time", localDateTime.toString(),
        "zoned_date_time", zonedDateTime.toString(),
        "duration", duration.toString(),
        "period", period.toString()
      ),
      "enum", status.name(),
      "record", user
    );
  }

  // Cas 1 : primitives
  static byte dtByte() { return 1; }
  static short dtShort() { return 2; }
  static int dtInt() { return 3; }
  static long dtLong() { return 4L; }
  static float dtFloat() { return 1.5f; }
  static double dtDouble() { return 2.5; }
  static char dtChar() { return 'A'; }
  static boolean dtBoolean() { return true; }

  // Cas 2 : wrappers (autoboxing)
  static Byte dtWrapperByte() { return (byte) 1; }
  static Short dtWrapperShort() { return (short) 2; }
  static Integer dtWrapperInteger() { return 3; }
  static Long dtWrapperLong() { return 4L; }
  static Float dtWrapperFloat() { return 1.5f; }
  static Double dtWrapperDouble() { return 2.5; }
  static Character dtWrapperCharacter() { return 'A'; }
  static Boolean dtWrapperBoolean() { return true; }

  // Cas 3 : arrays
  static int[] dtIntArray() { return new int[]{1, 2, 3}; }
  static String[] dtStringArray() { return new String[]{"a", "b"}; }

  // Cas 4 : collections
  static List<String> dtList() { return List.of("one", "two"); }
  static Map<String, Integer> dtMap() { return Map.of("a", 1, "b", 2); }

  // Cas 5 : Optional — présent et vide
  static Optional<String> dtOptionalPresent() { return Optional.of("value"); }
  static Optional<String> dtOptionalEmpty() { return Optional.empty(); }

  // Cas 6 : BigInteger et BigDecimal
  static BigInteger dtBigInteger() { return new BigInteger("123456789"); }
  static BigDecimal dtBigDecimal() { return new BigDecimal("123.45"); }

  // Cas 7 : UUID
  static String dtUuid() { return UUID.randomUUID().toString(); }

  // Cas 8 : date/time
  static Duration dtDuration() { return Duration.ofMinutes(90); }
  static Period dtPeriod() { return Period.ofDays(10); }
  static LocalDate dtLocalDate() { return LocalDate.of(2024, 1, 15); }
  static LocalTime dtLocalTime() { return LocalTime.of(10, 30, 0); }
  static LocalDateTime dtLocalDateTime() { return LocalDateTime.of(2024, 1, 15, 10, 30, 0); }

  // Cas 9 : enum
  static String dtEnum(Status status) { return status.name(); }

  // Cas 10 : record
  static User dtRecord(String name, int age) { return new User(name, age); }
}