package com.ganatan.starter.api.root;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  // Cas 1 : enum basique
  enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
  }

  // Cas 2 : enum avec champs et constructeur
  enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
      this.mass = mass;
      this.radius = radius;
    }

    double mass() {
      return mass;
    }

    double radius() {
      return radius;
    }
  }

  // Cas 3 : enum avec méthode
  enum Season {
    SPRING, SUMMER, AUTUMN, WINTER;

    boolean isWarm() {
      return this == SPRING || this == SUMMER;
    }
  }

  // Cas 4 : enum implémentant une interface
  interface Describable {
    String describe();
  }

  enum Priority implements Describable {
    LOW {
      @Override
      public String describe() {
        return "Low priority";
      }
    },
    MEDIUM {
      @Override
      public String describe() {
        return "Medium priority";
      }
    },
    HIGH {
      @Override
      public String describe() {
        return "High priority";
      }
    }
  }

  // Cas 5 : enum avec méthode abstraite par valeur
  enum Operation {
    ADD {
      @Override
      public int apply(int a, int b) {
        return a + b;
      }
    },
    SUBTRACT {
      @Override
      public int apply(int a, int b) {
        return a - b;
      }
    },
    MULTIPLY {
      @Override
      public int apply(int a, int b) {
        return a * b;
      }
    };

    public abstract int apply(int a, int b);
  }

  @GetMapping("/")
  public Map<String, Object> root() {
    String basicName = enumBasic(Day.WEDNESDAY);
    int basicOrdinal = enumOrdinal(Day.WEDNESDAY);
    Day basicValueOf = enumValueOf("FRIDAY");
    List<String> allValues = enumAllValues();
    double planetMass = enumWithFields(Planet.EARTH);
    boolean seasonWarm = enumWithMethod(Season.SUMMER);
    boolean seasonCold = enumWithMethod(Season.WINTER);
    String priorityLow = enumWithInterface(Priority.LOW);
    String priorityHigh = enumWithInterface(Priority.HIGH);
    int operationAdd = enumAbstractMethod(Operation.ADD, 10, 3);
    int operationMultiply = enumAbstractMethod(Operation.MULTIPLY, 10, 3);
    EnumSet<Day> weekend = enumSet();
    EnumMap<Season, String> seasonMap = enumMap();

    return Map.ofEntries(
      Map.entry("application", "springboot-starter"),
      Map.entry("status", "running"),
      Map.entry("java", System.getProperty("java.version")),
      Map.entry("enum_basic_name", basicName),
      Map.entry("enum_basic_ordinal", basicOrdinal),
      Map.entry("enum_basic_valueof", basicValueOf.name()),
      Map.entry("enum_all_values", allValues),
      Map.entry("enum_with_fields", planetMass),
      Map.entry("enum_with_method_warm", seasonWarm),
      Map.entry("enum_with_method_cold", seasonCold),
      Map.entry("enum_interface_low", priorityLow),
      Map.entry("enum_interface_high", priorityHigh),
      Map.entry("enum_abstract_add", operationAdd),
      Map.entry("enum_abstract_multiply", operationMultiply),
      Map.entry("enum_set", weekend.size()),
      Map.entry("enum_map", seasonMap.get(Season.SUMMER))
    );
  }

  // Cas 1 : name() — nom de la constante
  static String enumBasic(Day day) {
    return day.name();
  }

  // Cas 2 : ordinal() — position dans la déclaration (0-based)
  static int enumOrdinal(Day day) {
    return day.ordinal();
  }

  // Cas 3 : valueOf() — obtenir une constante depuis un String
  static Day enumValueOf(String name) {
    return Day.valueOf(name);
  }

  // Cas 4 : values() — itérer toutes les constantes
  static List<String> enumAllValues() {
    List<String> result = new java.util.ArrayList<>();
    for (Day day : Day.values()) {
      result.add(day.name());
    }
    return result;
  }

  // Cas 5 : enum avec champs et constructeur
  static double enumWithFields(Planet planet) {
    return planet.mass();
  }

  // Cas 6 : enum avec méthode instance
  static boolean enumWithMethod(Season season) {
    return season.isWarm();
  }

  // Cas 7 : enum implémentant une interface
  static String enumWithInterface(Priority priority) {
    return priority.describe();
  }

  // Cas 8 : enum avec méthode abstraite par valeur
  static int enumAbstractMethod(Operation operation, int a, int b) {
    return operation.apply(a, b);
  }

  // Cas 9 : EnumSet
  static EnumSet<Day> enumSet() {
    return EnumSet.of(Day.SATURDAY, Day.SUNDAY);
  }

  // Cas 10 : EnumMap
  static EnumMap<Season, String> enumMap() {
    EnumMap<Season, String> map = new EnumMap<>(Season.class);
    map.put(Season.SPRING, "Warm");
    map.put(Season.SUMMER, "Hot");
    map.put(Season.AUTUMN, "Cool");
    map.put(Season.WINTER, "Cold");
    return map;
  }
}