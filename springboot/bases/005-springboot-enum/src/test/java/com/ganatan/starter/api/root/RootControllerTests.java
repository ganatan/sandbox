package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

class RootControllerTests {

  private static final String APP = "springboot-starter";
  private static final String STATUS = "running";
  private static final String JAVA_PROP = "java.version";

  // --- root() global ---

  @Test
  void root_shouldReturnMapWithAllExpectedKeysAndValues() {
    RootController controller = new RootController();
    Map<String, Object> result = controller.root();

    assertNotNull(result);
    assertEquals(16, result.size());

    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));
    assertEquals(System.getProperty(JAVA_PROP), result.get("java"));

    assertEquals("WEDNESDAY", result.get("enum_basic_name"));
    assertEquals(2, (Integer) result.get("enum_basic_ordinal"));
    assertEquals("FRIDAY", result.get("enum_basic_valueof"));
    assertEquals(7, ((List<?>) result.get("enum_all_values")).size());
    assertEquals(5.976e+24, (Double) result.get("enum_with_fields"));
    assertEquals(true, result.get("enum_with_method_warm"));
    assertEquals(false, result.get("enum_with_method_cold"));
    assertEquals("Low priority", result.get("enum_interface_low"));
    assertEquals("High priority", result.get("enum_interface_high"));
    assertEquals(13, (Integer) result.get("enum_abstract_add"));
    assertEquals(30, (Integer) result.get("enum_abstract_multiply"));
    assertEquals(2, (Integer) result.get("enum_set"));
    assertEquals("Hot", result.get("enum_map"));

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 1 : enumBasic ---

  @Test
  void enumBasic_shouldReturnName() {
    assertEquals("MONDAY", RootController.enumBasic(RootController.Day.MONDAY));
  }

  @Test
  void enumBasic_shouldReturnWednesday() {
    assertEquals("WEDNESDAY", RootController.enumBasic(RootController.Day.WEDNESDAY));
  }

  // --- Cas 2 : enumOrdinal ---

  @Test
  void enumOrdinal_shouldReturnZero_forFirstConstant() {
    assertEquals(0, RootController.enumOrdinal(RootController.Day.MONDAY));
  }

  @Test
  void enumOrdinal_shouldReturnTwo_forWednesday() {
    assertEquals(2, RootController.enumOrdinal(RootController.Day.WEDNESDAY));
  }

  @Test
  void enumOrdinal_shouldReturnSix_forLastConstant() {
    assertEquals(6, RootController.enumOrdinal(RootController.Day.SUNDAY));
  }

  // --- Cas 3 : enumValueOf ---

  @Test
  void enumValueOf_shouldReturnCorrectConstant() {
    assertEquals(RootController.Day.FRIDAY, RootController.enumValueOf("FRIDAY"));
  }

  @Test
  void enumValueOf_shouldThrow_whenNameIsInvalid() {
    assertThrows(IllegalArgumentException.class, () -> RootController.enumValueOf("INVALID"));
  }

  // --- Cas 4 : enumAllValues ---

  @Test
  void enumAllValues_shouldReturnAllSevenDays() {
    List<String> result = RootController.enumAllValues();
    assertEquals(7, result.size());
    assertEquals("MONDAY", result.get(0));
    assertEquals("SUNDAY", result.get(6));
  }

  // --- Cas 5 : enumWithFields ---

  @Test
  void enumWithFields_shouldReturnEarthMass() {
    assertEquals(5.976e+24, RootController.enumWithFields(RootController.Planet.EARTH));
  }

  @Test
  void enumWithFields_shouldReturnMercuryMass() {
    assertEquals(3.303e+23, RootController.enumWithFields(RootController.Planet.MERCURY));
  }

  @Test
  void enumWithFields_shouldReturnVenusMass() {
    assertEquals(4.869e+24, RootController.enumWithFields(RootController.Planet.VENUS));
  }

  // --- Cas 6 : enumWithMethod ---

  @Test
  void enumWithMethod_shouldReturnTrue_whenWarm() {
    assertTrue(RootController.enumWithMethod(RootController.Season.SPRING));
    assertTrue(RootController.enumWithMethod(RootController.Season.SUMMER));
  }

  @Test
  void enumWithMethod_shouldReturnFalse_whenCold() {
    assertFalse(RootController.enumWithMethod(RootController.Season.AUTUMN));
    assertFalse(RootController.enumWithMethod(RootController.Season.WINTER));
  }

  // --- Cas 7 : enumWithInterface ---

  @Test
  void enumWithInterface_shouldReturnLowDescription() {
    assertEquals("Low priority", RootController.enumWithInterface(RootController.Priority.LOW));
  }

  @Test
  void enumWithInterface_shouldReturnMediumDescription() {
    assertEquals("Medium priority", RootController.enumWithInterface(RootController.Priority.MEDIUM));
  }

  @Test
  void enumWithInterface_shouldReturnHighDescription() {
    assertEquals("High priority", RootController.enumWithInterface(RootController.Priority.HIGH));
  }

  // --- Cas 8 : enumAbstractMethod ---

  @Test
  void enumAbstractMethod_shouldAdd() {
    assertEquals(13, RootController.enumAbstractMethod(RootController.Operation.ADD, 10, 3));
  }

  @Test
  void enumAbstractMethod_shouldSubtract() {
    assertEquals(7, RootController.enumAbstractMethod(RootController.Operation.SUBTRACT, 10, 3));
  }

  @Test
  void enumAbstractMethod_shouldMultiply() {
    assertEquals(30, RootController.enumAbstractMethod(RootController.Operation.MULTIPLY, 10, 3));
  }

  // --- Cas 9 : enumSet ---

  @Test
  void enumSet_shouldContainWeekend() {
    EnumSet<RootController.Day> result = RootController.enumSet();
    assertEquals(2, result.size());
    assertTrue(result.contains(RootController.Day.SATURDAY));
    assertTrue(result.contains(RootController.Day.SUNDAY));
    assertFalse(result.contains(RootController.Day.MONDAY));
  }

  // --- Cas 10 : enumMap ---

  @Test
  void enumMap_shouldContainAllSeasons() {
    EnumMap<RootController.Season, String> result = RootController.enumMap();
    assertEquals(4, result.size());
    assertEquals("Warm", result.get(RootController.Season.SPRING));
    assertEquals("Hot", result.get(RootController.Season.SUMMER));
    assertEquals("Cool", result.get(RootController.Season.AUTUMN));
    assertEquals("Cold", result.get(RootController.Season.WINTER));
  }
}
