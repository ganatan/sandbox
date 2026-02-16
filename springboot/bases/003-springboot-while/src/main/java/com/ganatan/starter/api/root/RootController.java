package com.ganatan.starter.api.root;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, Object> root() {
    List<Integer> nominal = whileNominal(5);
    List<Integer> zeroIteration = whileZeroIteration(10, 5);
    List<Integer> breakCase = whileBreak(3);
    List<Integer> continueCase = whileContinue(6);
    int guardNoBreak = whileGuardedLoop(5, 50);
    int guardWithBreak = whileGuardedLoop(1000, 50);
    List<Integer> decrementCase = whileDecrement(5);
    List<Integer> nestedCase = whileNested(3, 2);
    List<Integer> nullGuardCaseNull = whileNullGuard(null);
    List<Integer> nullGuardCaseNonEmpty = whileNullGuard(new ArrayList<>(List.of(9, 8)));
    List<Integer> doWhileCase = doWhileNominal(3);
    List<Integer> doWhileZeroCase = doWhileNominal(0);
    int sumCase = whileSum(5);
    List<Integer> orConditionCase = whileOrCondition(3, 5);

    return Map.ofEntries(
      Map.entry("application", "springboot-starter"),
      Map.entry("status", "running"),
      Map.entry("java", System.getProperty("java.version")),
      Map.entry("while_nominal", nominal),
      Map.entry("while_zeroIteration", zeroIteration),
      Map.entry("while_break", breakCase),
      Map.entry("while_continue", continueCase),
      Map.entry("while_guard_no_break", guardNoBreak),
      Map.entry("while_guard_with_break", guardWithBreak),
      Map.entry("while_decrement", decrementCase),
      Map.entry("while_nested", nestedCase),
      Map.entry("while_null_guard_null", nullGuardCaseNull),
      Map.entry("while_null_guard_non_empty", nullGuardCaseNonEmpty),
      Map.entry("do_while_nominal", doWhileCase),
      Map.entry("do_while_zero", doWhileZeroCase),
      Map.entry("while_sum", sumCase),
      Map.entry("while_or_condition", orConditionCase)
    );
  }

  // Cas 1 : boucle nominale 0..n
  static List<Integer> whileNominal(int maxExclusive) {
    List<Integer> out = new ArrayList<>();
    int i = 0;
    while (i < maxExclusive) {
      out.add(i);
      i++;
    }
    return out;
  }

  // Cas 2 : zéro itération (condition fausse dès le départ)
  static List<Integer> whileZeroIteration(int start, int maxExclusive) {
    List<Integer> out = new ArrayList<>();
    int i = start;
    while (i < maxExclusive) {
      out.add(i);
      i++;
    }
    return out;
  }

  // Cas 3 : break
  static List<Integer> whileBreak(int breakAt) {
    List<Integer> out = new ArrayList<>();
    int i = 0;
    while (true) {
      if (i == breakAt) {
        break;
      }
      out.add(i);
      i++;
    }
    return out;
  }

  // Cas 4 : continue (filtre les pairs)
  static List<Integer> whileContinue(int maxExclusive) {
    List<Integer> out = new ArrayList<>();
    int i = 0;
    while (i < maxExclusive) {
      i++;
      if (i % 2 == 0) {
        continue;
      }
      out.add(i);
    }
    return out;
  }

  // Cas 5 : guard contre boucle infinie (deux branches : break déclenché ou non)
  static int whileGuardedLoop(int maxExclusive, int guardLimit) {
    int i = 0;
    int guard = 0;
    while (i < maxExclusive) {
      i++;
      guard++;
      if (guard > guardLimit) {
        break;
      }
    }
    return guard;
  }

  // Cas 6 : décrémentation
  static List<Integer> whileDecrement(int start) {
    List<Integer> out = new ArrayList<>();
    int i = start;
    while (i > 0) {
      out.add(i);
      i--;
    }
    return out;
  }

  // Cas 7 : boucles imbriquées
  static List<Integer> whileNested(int outerMaxInclusive, int innerMaxInclusive) {
    List<Integer> out = new ArrayList<>();
    int outer = 1;
    while (outer <= outerMaxInclusive) {
      int inner = 1;
      while (inner <= innerMaxInclusive) {
        out.add(outer * 10 + inner);
        inner++;
      }
      outer++;
    }
    return out;
  }

  // Cas 8 : null guard avec court-circuit &&
  static List<Integer> whileNullGuard(List<Integer> maybeNull) {
    List<Integer> out = new ArrayList<>();
    while (maybeNull != null && !maybeNull.isEmpty()) {
      out.add(maybeNull.remove(0));
    }
    return out;
  }

  // Cas 9 : do-while (corps exécuté au moins une fois même si condition fausse)
  static List<Integer> doWhileNominal(int maxExclusive) {
    List<Integer> out = new ArrayList<>();
    int i = 0;
    do {
      out.add(i);
      i++;
    } while (i < maxExclusive);
    return out;
  }

  // Cas 10 : accumulation / agrégat (réducteur)
  static int whileSum(int upToInclusive) {
    int sum = 0;
    int i = 1;
    while (i <= upToInclusive) {
      sum += i;
      i++;
    }
    return sum;
  }

  // Cas 11 : condition composée ||
  static List<Integer> whileOrCondition(int a, int b) {
    List<Integer> out = new ArrayList<>();
    int i = 0;
    while (i < a || i < b) {
      out.add(i);
      i++;
    }
    return out;
  }
}


