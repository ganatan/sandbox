package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class RootControllerTests {

  private static final String APP = "springboot-starter";
  private static final String JAVA_PROP = "java.version";

  // --- root() global ---

  @Test
  void root_shouldReturnMapWithAllExpectedKeys() {
    RootController controller = new RootController();
    Map<String, Object> result = controller.root();

    assertNotNull(result);
    assertEquals(10, result.size());

    assertTrue(result.containsKey("primitives"));
    assertTrue(result.containsKey("wrappers"));
    assertTrue(result.containsKey("arrays"));
    assertTrue(result.containsKey("collections"));
    assertTrue(result.containsKey("optional"));
    assertTrue(result.containsKey("big_numbers"));
    assertTrue(result.containsKey("uuid"));
    assertTrue(result.containsKey("date_time"));
    assertTrue(result.containsKey("enum"));
    assertTrue(result.containsKey("record"));

    assertEquals("RUNNING", result.get("enum"));
    assertEquals("value", result.get("optional"));

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  @Test
  void root_primitives_shouldContainExpectedValues() {
    RootController controller = new RootController();
    Map<?, ?> primitives = (Map<?, ?>) controller.root().get("primitives");

    assertEquals((byte) 1, primitives.get("byte"));
    assertEquals((short) 2, primitives.get("short"));
    assertEquals(3, primitives.get("int"));
    assertEquals(4L, primitives.get("long"));
    assertEquals(1.5f, primitives.get("float"));
    assertEquals(2.5, primitives.get("double"));
    assertEquals("A", primitives.get("char"));
    assertEquals(true, primitives.get("boolean"));
  }

  @Test
  void root_wrappers_shouldContainExpectedValues() {
    RootController controller = new RootController();
    Map<?, ?> wrappers = (Map<?, ?>) controller.root().get("wrappers");

    assertEquals((byte) 1, wrappers.get("Byte"));
    assertEquals((short) 2, wrappers.get("Short"));
    assertEquals(3, wrappers.get("Integer"));
    assertEquals(4L, wrappers.get("Long"));
    assertEquals(1.5f, wrappers.get("Float"));
    assertEquals(2.5, wrappers.get("Double"));
    assertEquals('A', wrappers.get("Character"));
    assertEquals(true, wrappers.get("Boolean"));
  }

  @Test
  void root_bigNumbers_shouldContainExpectedValues() {
    RootController controller = new RootController();
    Map<?, ?> bigNumbers = (Map<?, ?>) controller.root().get("big_numbers");

    assertEquals(new BigInteger("123456789"), bigNumbers.get("BigInteger"));
    assertEquals(new BigDecimal("123.45"), bigNumbers.get("BigDecimal"));
  }

  @Test
  void root_uuid_shouldBeValidUuidFormat() {
    RootController controller = new RootController();
    String uuid = (String) controller.root().get("uuid");
    assertNotNull(uuid);
    assertTrue(uuid.matches(
      "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    ));
  }

  @Test
  void root_dateTime_shouldContainAllKeys() {
    RootController controller = new RootController();
    Map<?, ?> dateTime = (Map<?, ?>) controller.root().get("date_time");

    assertTrue(dateTime.containsKey("legacy_date"));
    assertTrue(dateTime.containsKey("instant"));
    assertTrue(dateTime.containsKey("local_date"));
    assertTrue(dateTime.containsKey("local_time"));
    assertTrue(dateTime.containsKey("local_date_time"));
    assertTrue(dateTime.containsKey("zoned_date_time"));
    assertEquals("PT1H30M", dateTime.get("duration"));
    assertEquals("P10D", dateTime.get("period"));
  }

  @Test
  void root_record_shouldContainUserFields() {
    RootController controller = new RootController();
    RootController.User user = (RootController.User) controller.root().get("record");
    assertEquals("Alice", user.name());
    assertEquals(30, user.age());
  }

  // --- Cas 1 : primitives ---

  @Test
  void dtByte_shouldReturnOne() { assertEquals((byte) 1, RootController.dtByte()); }

  @Test
  void dtShort_shouldReturnTwo() { assertEquals((short) 2, RootController.dtShort()); }

  @Test
  void dtInt_shouldReturnThree() { assertEquals(3, RootController.dtInt()); }

  @Test
  void dtLong_shouldReturnFour() { assertEquals(4L, RootController.dtLong()); }

  @Test
  void dtFloat_shouldReturnOnePointFive() { assertEquals(1.5f, RootController.dtFloat()); }

  @Test
  void dtDouble_shouldReturnTwoPointFive() { assertEquals(2.5, RootController.dtDouble()); }

  @Test
  void dtChar_shouldReturnA() { assertEquals('A', RootController.dtChar()); }

  @Test
  void dtBoolean_shouldReturnTrue() { assertTrue(RootController.dtBoolean()); }

  // --- Cas 2 : wrappers ---

  @Test
  void dtWrapperByte_shouldReturnOne() { assertEquals((byte) 1, RootController.dtWrapperByte()); }

  @Test
  void dtWrapperShort_shouldReturnTwo() { assertEquals((short) 2, RootController.dtWrapperShort()); }

  @Test
  void dtWrapperInteger_shouldReturnThree() { assertEquals(3, RootController.dtWrapperInteger()); }

  @Test
  void dtWrapperLong_shouldReturnFour() { assertEquals(4L, RootController.dtWrapperLong()); }

  @Test
  void dtWrapperFloat_shouldReturnOnePointFive() { assertEquals(1.5f, RootController.dtWrapperFloat()); }

  @Test
  void dtWrapperDouble_shouldReturnTwoPointFive() { assertEquals(2.5, RootController.dtWrapperDouble()); }

  @Test
  void dtWrapperCharacter_shouldReturnA() { assertEquals('A', RootController.dtWrapperCharacter()); }

  @Test
  void dtWrapperBoolean_shouldReturnTrue() { assertTrue(RootController.dtWrapperBoolean()); }

  // --- Cas 3 : arrays ---

  @Test
  void dtIntArray_shouldReturnExpectedValues() {
    assertArrayEquals(new int[]{1, 2, 3}, RootController.dtIntArray());
  }

  @Test
  void dtStringArray_shouldReturnExpectedValues() {
    assertArrayEquals(new String[]{"a", "b"}, RootController.dtStringArray());
  }

  // --- Cas 4 : collections ---

  @Test
  void dtList_shouldReturnImmutableListWithTwoElements() {
    List<String> result = RootController.dtList();
    assertEquals(List.of("one", "two"), result);
    assertThrows(UnsupportedOperationException.class, () -> result.add("three"));
  }

  @Test
  void dtMap_shouldReturnImmutableMapWithTwoEntries() {
    Map<String, Integer> result = RootController.dtMap();
    assertEquals(1, result.get("a"));
    assertEquals(2, result.get("b"));
    assertThrows(UnsupportedOperationException.class, () -> result.put("c", 3));
  }

  // --- Cas 5 : Optional ---

  @Test
  void dtOptionalPresent_shouldContainValue() {
    Optional<String> result = RootController.dtOptionalPresent();
    assertTrue(result.isPresent());
    assertEquals("value", result.get());
  }

  @Test
  void dtOptionalEmpty_shouldBeEmpty() {
    Optional<String> result = RootController.dtOptionalEmpty();
    assertFalse(result.isPresent());
    assertEquals("default", result.orElse("default"));
  }

  // --- Cas 6 : BigInteger / BigDecimal ---

  @Test
  void dtBigInteger_shouldReturnExpectedValue() {
    assertEquals(new BigInteger("123456789"), RootController.dtBigInteger());
  }

  @Test
  void dtBigDecimal_shouldReturnExpectedValue() {
    assertEquals(new BigDecimal("123.45"), RootController.dtBigDecimal());
  }

  // --- Cas 7 : UUID ---

  @Test
  void dtUuid_shouldBeValidFormat() {
    String uuid = RootController.dtUuid();
    assertNotNull(uuid);
    assertTrue(uuid.matches(
      "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    ));
  }

  @Test
  void dtUuid_shouldBeUniqueOnEachCall() {
    assertNotEquals(RootController.dtUuid(), RootController.dtUuid());
  }

  // --- Cas 8 : date/time ---

  @Test
  void dtDuration_shouldBe90Minutes() {
    assertEquals(Duration.ofMinutes(90), RootController.dtDuration());
    assertEquals("PT1H30M", RootController.dtDuration().toString());
  }

  @Test
  void dtPeriod_shouldBe10Days() {
    assertEquals(Period.ofDays(10), RootController.dtPeriod());
    assertEquals("P10D", RootController.dtPeriod().toString());
  }

  @Test
  void dtLocalDate_shouldReturnExpectedDate() {
    assertEquals(LocalDate.of(2024, 1, 15), RootController.dtLocalDate());
  }

  @Test
  void dtLocalTime_shouldReturnExpectedTime() {
    assertEquals(LocalTime.of(10, 30, 0), RootController.dtLocalTime());
  }

  @Test
  void dtLocalDateTime_shouldReturnExpectedDateTime() {
    assertEquals(LocalDateTime.of(2024, 1, 15, 10, 30, 0), RootController.dtLocalDateTime());
  }

  // --- Cas 9 : enum ---

  @Test
  void dtEnum_shouldReturnRunning() {
    assertEquals("RUNNING", RootController.dtEnum(RootController.Status.RUNNING));
  }

  @Test
  void dtEnum_shouldReturnCreated() {
    assertEquals("CREATED", RootController.dtEnum(RootController.Status.CREATED));
  }

  @Test
  void dtEnum_shouldReturnFailed() {
    assertEquals("FAILED", RootController.dtEnum(RootController.Status.FAILED));
  }

  // --- Cas 10 : record ---

  @Test
  void dtRecord_shouldReturnExpectedFields() {
    RootController.User user = RootController.dtRecord("Alice", 30);
    assertEquals("Alice", user.name());
    assertEquals(30, user.age());
  }

  @Test
  void dtRecord_shouldBeImmutable() {
    RootController.User u1 = RootController.dtRecord("Alice", 30);
    RootController.User u2 = RootController.dtRecord("Alice", 30);
    assertEquals(u1, u2);
  }
}