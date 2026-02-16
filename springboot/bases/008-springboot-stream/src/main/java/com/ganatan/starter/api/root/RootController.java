package com.ganatan.starter.api.root;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, Object> root() {
    List<Integer> filterResult       = streamFilter();
    List<Integer> mapResult          = streamMap();
    List<Integer> flatMapResult      = streamFlatMap();
    int reduceResult                 = streamReduce();
    List<Integer> sortedResult       = streamSorted();
    List<Integer> distinctResult     = streamDistinct();
    List<Integer> limitResult        = streamLimit();
    List<Integer> skipResult         = streamSkip();
    long countResult                 = streamCount();
    Optional<Integer> findFirstResult = streamFindFirst();
    boolean anyMatchResult           = streamAnyMatch();
    boolean allMatchResult           = streamAllMatch();
    boolean noneMatchResult          = streamNoneMatch();
    Optional<Integer> minResult      = streamMin();
    Optional<Integer> maxResult      = streamMax();
    int sumResult                    = streamSum();
    double averageResult             = streamAverage();
    Map<Boolean, List<Integer>> partitionResult = streamPartitionBy();
    Map<Integer, List<String>> groupByResult    = streamGroupBy();
    List<String> collectJoiningResult           = streamCollectJoining();
    List<Integer> peekResult                    = streamPeek();
    List<Integer> streamOfResult                = streamOf();

    return Map.ofEntries(
      Map.entry("application",        "springboot-starter"),
      Map.entry("status",             "running"),
      Map.entry("java",               System.getProperty("java.version")),
      Map.entry("stream_filter",      filterResult),
      Map.entry("stream_map",         mapResult),
      Map.entry("stream_flatmap",     flatMapResult),
      Map.entry("stream_reduce",      reduceResult),
      Map.entry("stream_sorted",      sortedResult),
      Map.entry("stream_distinct",    distinctResult),
      Map.entry("stream_limit",       limitResult),
      Map.entry("stream_skip",        skipResult),
      Map.entry("stream_count",       countResult),
      Map.entry("stream_findfirst",   findFirstResult.orElse(null)),
      Map.entry("stream_anymatch",    anyMatchResult),
      Map.entry("stream_allmatch",    allMatchResult),
      Map.entry("stream_nonematch",   noneMatchResult),
      Map.entry("stream_min",         minResult.orElse(null)),
      Map.entry("stream_max",         maxResult.orElse(null)),
      Map.entry("stream_sum",         sumResult),
      Map.entry("stream_average",     averageResult),
      Map.entry("stream_partition",   partitionResult.get(true)),
      Map.entry("stream_groupby",     groupByResult),
      Map.entry("stream_joining",     collectJoiningResult),
      Map.entry("stream_peek",        peekResult),
      Map.entry("stream_of",          streamOfResult)
    );
  }

  // Cas 1 : filter — garde les éléments qui satisfont le prédicat
  static List<Integer> streamFilter() {
    return List.of(1, 2, 3, 4, 5, 6)
      .stream()
      .filter(n -> n % 2 == 0)
      .collect(Collectors.toList());
  }

  // Cas 2 : map — transforme chaque élément
  static List<Integer> streamMap() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .map(n -> n * 2)
      .collect(Collectors.toList());
  }

  // Cas 3 : flatMap — aplatit les collections imbriquées
  static List<Integer> streamFlatMap() {
    return List.of(List.of(1, 2), List.of(3, 4), List.of(5, 6))
      .stream()
      .flatMap(List::stream)
      .collect(Collectors.toList());
  }

  // Cas 4 : reduce — agrège en une seule valeur
  static int streamReduce() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .reduce(0, Integer::sum);
  }

  // Cas 5 : sorted — tri naturel
  static List<Integer> streamSorted() {
    return List.of(5, 3, 1, 4, 2)
      .stream()
      .sorted()
      .collect(Collectors.toList());
  }

  // Cas 6 : distinct — supprime les doublons
  static List<Integer> streamDistinct() {
    return List.of(1, 2, 2, 3, 3, 3, 4)
      .stream()
      .distinct()
      .collect(Collectors.toList());
  }

  // Cas 7 : limit — tronque à n éléments
  static List<Integer> streamLimit() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .limit(3)
      .collect(Collectors.toList());
  }

  // Cas 8 : skip — ignore les n premiers éléments
  static List<Integer> streamSkip() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .skip(2)
      .collect(Collectors.toList());
  }

  // Cas 9 : count — compte les éléments
  static long streamCount() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .filter(n -> n > 2)
      .count();
  }

  // Cas 10 : findFirst — retourne le premier élément
  static Optional<Integer> streamFindFirst() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .filter(n -> n > 3)
      .findFirst();
  }

  // Cas 11 : anyMatch — vrai si au moins un élément satisfait le prédicat
  static boolean streamAnyMatch() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .anyMatch(n -> n > 4);
  }

  // Cas 12 : allMatch — vrai si tous les éléments satisfont le prédicat
  static boolean streamAllMatch() {
    return List.of(2, 4, 6, 8)
      .stream()
      .allMatch(n -> n % 2 == 0);
  }

  // Cas 13 : noneMatch — vrai si aucun élément ne satisfait le prédicat
  static boolean streamNoneMatch() {
    return List.of(1, 3, 5, 7)
      .stream()
      .noneMatch(n -> n % 2 == 0);
  }

  // Cas 14 : min — retourne le minimum
  static Optional<Integer> streamMin() {
    return List.of(3, 1, 4, 1, 5, 9)
      .stream()
      .min(Comparator.naturalOrder());
  }

  // Cas 15 : max — retourne le maximum
  static Optional<Integer> streamMax() {
    return List.of(3, 1, 4, 1, 5, 9)
      .stream()
      .max(Comparator.naturalOrder());
  }

  // Cas 16 : sum via mapToInt
  static int streamSum() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .mapToInt(Integer::intValue)
      .sum();
  }

  // Cas 17 : average via mapToInt
  static double streamAverage() {
    return List.of(1, 2, 3, 4, 5)
      .stream()
      .mapToInt(Integer::intValue)
      .average()
      .orElse(0.0);
  }

  // Cas 18 : partitioningBy — sépare en deux groupes
  static Map<Boolean, List<Integer>> streamPartitionBy() {
    return List.of(1, 2, 3, 4, 5, 6)
      .stream()
      .collect(Collectors.partitioningBy(n -> n % 2 == 0));
  }

  // Cas 19 : groupingBy — regroupe par critère
  static Map<Integer, List<String>> streamGroupBy() {
    return List.of("a", "bb", "cc", "ddd", "ee")
      .stream()
      .collect(Collectors.groupingBy(String::length));
  }

  // Cas 20 : joining — concatène en String
  static List<String> streamCollectJoining() {
    String joined = List.of("a", "b", "c")
      .stream()
      .collect(Collectors.joining(", "));
    return List.of(joined);
  }

  // Cas 21 : peek — inspecte sans modifier (debug)
  static List<Integer> streamPeek() {
    List<Integer> seen = new java.util.ArrayList<>();
    List<Integer> result = List.of(1, 2, 3)
      .stream()
      .peek(seen::add)
      .map(n -> n * 10)
      .collect(Collectors.toList());
    return result;
  }

  // Cas 22 : Stream.of — crée un stream depuis des valeurs
  static List<Integer> streamOf() {
    return Stream.of(10, 20, 30)
      .collect(Collectors.toList());
  }
}