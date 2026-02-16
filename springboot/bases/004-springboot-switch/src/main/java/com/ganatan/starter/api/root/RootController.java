package com.ganatan.starter.api.root;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, Object> root() {
    String classicInt = switchClassicInt(3);
    String classicString = switchClassicString("WINTER");
    String fallThrough = switchFallThrough(4);
    String defaultCase = switchDefault(99);
    String expressionArrow = switchExpressionArrow(85);
    String expressionYield = switchExpressionYield(2);
    String enumCase = switchEnum(Status.ACTIVE);
    int expressionCalc = switchExpressionCalc(3);

    return Map.ofEntries(
      Map.entry("application", "springboot-starter"),
      Map.entry("status", "running"),
      Map.entry("java", System.getProperty("java.version")),
      Map.entry("switch_classic_int", classicInt),
      Map.entry("switch_classic_string", classicString),
      Map.entry("switch_fallthrough", fallThrough),
      Map.entry("switch_default", defaultCase),
      Map.entry("switch_expression_arrow", expressionArrow),
      Map.entry("switch_expression_yield", expressionYield),
      Map.entry("switch_enum", enumCase),
      Map.entry("switch_expression_calc", expressionCalc)
    );
  }

  // Cas 1 : switch classique sur int
  static String switchClassicInt(int day) {
    String result;
    switch (day) {
      case 1:
        result = "Monday";
        break;
      case 2:
        result = "Tuesday";
        break;
      case 3:
        result = "Wednesday";
        break;
      default:
        result = "Unknown";
        break;
    }
    return result;
  }

  // Cas 2 : switch classique sur String
  static String switchClassicString(String season) {
    String result;
    switch (season) {
      case "SPRING":
        result = "Warm";
        break;
      case "SUMMER":
        result = "Hot";
        break;
      case "AUTUMN":
        result = "Cool";
        break;
      case "WINTER":
        result = "Cold";
        break;
      default:
        result = "Unknown";
        break;
    }
    return result;
  }

  // Cas 3 : fall-through (cases regroupés intentionnellement)
  static String switchFallThrough(int month) {
    String result;
    switch (month) {
      case 1:
      case 2:
      case 3:
        result = "Q1";
        break;
      case 4:
      case 5:
      case 6:
        result = "Q2";
        break;
      case 7:
      case 8:
      case 9:
        result = "Q3";
        break;
      default:
        result = "Q4";
        break;
    }
    return result;
  }

  // Cas 4 : default atteint (aucun case ne correspond)
  static String switchDefault(int code) {
    String result;
    switch (code) {
      case 1:
        result = "One";
        break;
      case 2:
        result = "Two";
        break;
      default:
        result = "Other";
        break;
    }
    return result;
  }

  // Cas 5 : switch expression avec -> (Java 14+)
  static String switchExpressionArrow(int score) {
    return switch (score / 10) {
      case 10, 9 -> "A";
      case 8 -> "B";
      case 7 -> "C";
      case 6 -> "D";
      default -> "F";
    };
  }

  // Cas 6 : switch expression avec yield (bloc multi-lignes)
  static String switchExpressionYield(int code) {
    return switch (code) {
      case 1 -> "Low";
      case 2 -> {
        String prefix = "Med";
        yield prefix + "ium";
      }
      case 3 -> "High";
      default -> "Unknown";
    };
  }

  // Cas 7 : switch sur enum (exhaustif, pas de default nécessaire)
  static String switchEnum(Status status) {
    return switch (status) {
      case ACTIVE -> "Active";
      case INACTIVE -> "Inactive";
      case PENDING -> "Pending";
    };
  }

  // Cas 8 : switch expression assigné à une variable avec calcul
  static int switchExpressionCalc(int level) {
    return switch (level) {
      case 1 -> 10;
      case 2 -> 20;
      case 3 -> 30;
      default -> 0;
    };
  }

  enum Status {
    ACTIVE, INACTIVE, PENDING
  }
}