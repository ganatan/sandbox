package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

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
    assertEquals(11, result.size());

    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));
    assertEquals(System.getProperty(JAVA_PROP), result.get("java"));

    assertEquals("Wednesday", result.get("switch_classic_int"));
    assertEquals("Cold", result.get("switch_classic_string"));
    assertEquals("Q2", result.get("switch_fallthrough"));
    assertEquals("Other", result.get("switch_default"));
    assertEquals("B", result.get("switch_expression_arrow"));
    assertEquals("Medium", result.get("switch_expression_yield"));
    assertEquals("Active", result.get("switch_enum"));
    assertEquals(30, (Integer) result.get("switch_expression_calc"));

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 1 : switchClassicInt ---

  @Test
  void switchClassicInt_shouldReturnMonday_whenDayIsOne() {
    assertEquals("Monday", RootController.switchClassicInt(1));
  }

  @Test
  void switchClassicInt_shouldReturnTuesday_whenDayIsTwo() {
    assertEquals("Tuesday", RootController.switchClassicInt(2));
  }

  @Test
  void switchClassicInt_shouldReturnWednesday_whenDayIsThree() {
    assertEquals("Wednesday", RootController.switchClassicInt(3));
  }

  @Test
  void switchClassicInt_shouldReturnUnknown_whenDayIsOutOfRange() {
    assertEquals("Unknown", RootController.switchClassicInt(99));
  }

  // --- Cas 2 : switchClassicString ---

  @Test
  void switchClassicString_shouldReturnWarm_whenSpring() {
    assertEquals("Warm", RootController.switchClassicString("SPRING"));
  }

  @Test
  void switchClassicString_shouldReturnHot_whenSummer() {
    assertEquals("Hot", RootController.switchClassicString("SUMMER"));
  }

  @Test
  void switchClassicString_shouldReturnCool_whenAutumn() {
    assertEquals("Cool", RootController.switchClassicString("AUTUMN"));
  }

  @Test
  void switchClassicString_shouldReturnCold_whenWinter() {
    assertEquals("Cold", RootController.switchClassicString("WINTER"));
  }

  @Test
  void switchClassicString_shouldReturnUnknown_whenUnrecognized() {
    assertEquals("Unknown", RootController.switchClassicString("MONSOON"));
  }

  // --- Cas 3 : switchFallThrough ---

  @Test
  void switchFallThrough_shouldReturnQ1_whenMonthIsOne() {
    assertEquals("Q1", RootController.switchFallThrough(1));
  }

  @Test
  void switchFallThrough_shouldReturnQ1_whenMonthIsTwo() {
    assertEquals("Q1", RootController.switchFallThrough(2));
  }

  @Test
  void switchFallThrough_shouldReturnQ1_whenMonthIsThree() {
    assertEquals("Q1", RootController.switchFallThrough(3));
  }

  @Test
  void switchFallThrough_shouldReturnQ2_whenMonthIsFour() {
    assertEquals("Q2", RootController.switchFallThrough(4));
  }

  @Test
  void switchFallThrough_shouldReturnQ2_whenMonthIsFive() {
    assertEquals("Q2", RootController.switchFallThrough(5));
  }

  @Test
  void switchFallThrough_shouldReturnQ2_whenMonthIsSix() {
    assertEquals("Q2", RootController.switchFallThrough(6));
  }

  @Test
  void switchFallThrough_shouldReturnQ3_whenMonthIsSeven() {
    assertEquals("Q3", RootController.switchFallThrough(7));
  }

  @Test
  void switchFallThrough_shouldReturnQ3_whenMonthIsEight() {
    assertEquals("Q3", RootController.switchFallThrough(8));
  }

  @Test
  void switchFallThrough_shouldReturnQ3_whenMonthIsNine() {
    assertEquals("Q3", RootController.switchFallThrough(9));
  }

  @Test
  void switchFallThrough_shouldReturnQ4_whenMonthIsDefault() {
    assertEquals("Q4", RootController.switchFallThrough(12));
  }

  // --- Cas 4 : switchDefault ---

  @Test
  void switchDefault_shouldReturnOne_whenCodeIsOne() {
    assertEquals("One", RootController.switchDefault(1));
  }

  @Test
  void switchDefault_shouldReturnTwo_whenCodeIsTwo() {
    assertEquals("Two", RootController.switchDefault(2));
  }

  @Test
  void switchDefault_shouldReturnOther_whenCodeIsUnknown() {
    assertEquals("Other", RootController.switchDefault(99));
  }

  // --- Cas 5 : switchExpressionArrow ---

  @Test
  void switchExpressionArrow_shouldReturnA_whenScoreIsNinety() {
    assertEquals("A", RootController.switchExpressionArrow(90));
  }

  @Test
  void switchExpressionArrow_shouldReturnA_whenScoreIsHundred() {
    assertEquals("A", RootController.switchExpressionArrow(100));
  }

  @Test
  void switchExpressionArrow_shouldReturnB_whenScoreIsEightyFive() {
    assertEquals("B", RootController.switchExpressionArrow(85));
  }

  @Test
  void switchExpressionArrow_shouldReturnC_whenScoreIsSeventy() {
    assertEquals("C", RootController.switchExpressionArrow(70));
  }

  @Test
  void switchExpressionArrow_shouldReturnD_whenScoreIsSixty() {
    assertEquals("D", RootController.switchExpressionArrow(60));
  }

  @Test
  void switchExpressionArrow_shouldReturnF_whenScoreIsFifty() {
    assertEquals("F", RootController.switchExpressionArrow(50));
  }

  // --- Cas 6 : switchExpressionYield ---

  @Test
  void switchExpressionYield_shouldReturnLow_whenCodeIsOne() {
    assertEquals("Low", RootController.switchExpressionYield(1));
  }

  @Test
  void switchExpressionYield_shouldReturnMedium_whenCodeIsTwo() {
    assertEquals("Medium", RootController.switchExpressionYield(2));
  }

  @Test
  void switchExpressionYield_shouldReturnHigh_whenCodeIsThree() {
    assertEquals("High", RootController.switchExpressionYield(3));
  }

  @Test
  void switchExpressionYield_shouldReturnUnknown_whenCodeIsDefault() {
    assertEquals("Unknown", RootController.switchExpressionYield(99));
  }

  // --- Cas 7 : switchEnum ---

  @Test
  void switchEnum_shouldReturnActive_whenStatusIsActive() {
    assertEquals("Active", RootController.switchEnum(RootController.Status.ACTIVE));
  }

  @Test
  void switchEnum_shouldReturnInactive_whenStatusIsInactive() {
    assertEquals("Inactive", RootController.switchEnum(RootController.Status.INACTIVE));
  }

  @Test
  void switchEnum_shouldReturnPending_whenStatusIsPending() {
    assertEquals("Pending", RootController.switchEnum(RootController.Status.PENDING));
  }

  // --- Cas 8 : switchExpressionCalc ---

  @Test
  void switchExpressionCalc_shouldReturnTen_whenLevelIsOne() {
    assertEquals(10, RootController.switchExpressionCalc(1));
  }

  @Test
  void switchExpressionCalc_shouldReturnTwenty_whenLevelIsTwo() {
    assertEquals(20, RootController.switchExpressionCalc(2));
  }

  @Test
  void switchExpressionCalc_shouldReturnThirty_whenLevelIsThree() {
    assertEquals(30, RootController.switchExpressionCalc(3));
  }

  @Test
  void switchExpressionCalc_shouldReturnZero_whenLevelIsDefault() {
    assertEquals(0, RootController.switchExpressionCalc(99));
  }
}