package com.ganatan.starter.api.root;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, Object> root() {
    Map<String, String> hashMap          = mapHashMap();
    Map<String, String> linkedHashMap    = mapLinkedHashMap();
    Map<String, String> treeMap          = mapTreeMap();
    Map<String, String> concurrentMap    = mapConcurrentHashMap();
    Map<String, String> immutableOf      = mapImmutableOf();
    Map<String, String> immutableEntries = mapImmutableEntries();
    String getResult                     = mapGet();
    String getOrDefault                  = mapGetOrDefault();
    boolean containsKey                  = mapContainsKey();
    boolean containsValue                = mapContainsValue();
    List<String> entrySet                = mapIterateEntrySet();
    List<String> keySet                  = mapIterateKeySet();
    List<String> values                  = mapIterateValues();
    Map<String, Integer> computeIfAbsent = mapComputeIfAbsent();
    Map<String, Integer> merge           = mapMerge();
    Map<String, String> replaceAll       = mapReplaceAll();
    boolean nullKeyAllowed               = mapNullKey();
    int size                             = mapSize();
    Map<String, String> putIfAbsent      = mapPutIfAbsent();
    Map<String, String> remove           = mapRemove();

    return Map.ofEntries(
      Map.entry("application",              "springboot-starter"),
      Map.entry("status",                   "running"),
      Map.entry("java",                     System.getProperty("java.version")),
      Map.entry("map_hashmap",              hashMap.get("a")),
      Map.entry("map_linkedhashmap_order",  new ArrayList<>(linkedHashMap.keySet()).get(0)),
      Map.entry("map_treemap_firstkey",     new ArrayList<>(treeMap.keySet()).get(0)),
      Map.entry("map_concurrent",           concurrentMap.get("a")),
      Map.entry("map_immutable_of",         immutableOf.get("a")),
      Map.entry("map_immutable_entries",    immutableEntries.get("a")),
      Map.entry("map_get",                  getResult),
      Map.entry("map_get_or_default",       getOrDefault),
      Map.entry("map_contains_key",         containsKey),
      Map.entry("map_contains_value",       containsValue),
      Map.entry("map_entryset",             entrySet),
      Map.entry("map_keyset",               keySet),
      Map.entry("map_values",               values),
      Map.entry("map_compute_if_absent",    computeIfAbsent.get("hello")),
      Map.entry("map_merge",                merge.get("a")),
      Map.entry("map_replace_all",          replaceAll.get("a")),
      Map.entry("map_null_key",             nullKeyAllowed),
      Map.entry("map_size",                 size),
      Map.entry("map_put_if_absent",        putIfAbsent.get("a")),
      Map.entry("map_remove",               remove.containsKey("a"))
    );
  }

  // Cas 1 : HashMap — non ordonné, clé null autorisée
  static Map<String, String> mapHashMap() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    map.put("c", "gamma");
    return map;
  }

  // Cas 2 : LinkedHashMap — conserve l'ordre d'insertion
  static Map<String, String> mapLinkedHashMap() {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("first", "1");
    map.put("second", "2");
    map.put("third", "3");
    return map;
  }

  // Cas 3 : TreeMap — trié par ordre naturel des clés
  static Map<String, String> mapTreeMap() {
    Map<String, String> map = new TreeMap<>();
    map.put("banana", "yellow");
    map.put("apple", "red");
    map.put("cherry", "red");
    return map;
  }

  // Cas 4 : ConcurrentHashMap — thread-safe
  static Map<String, String> mapConcurrentHashMap() {
    Map<String, String> map = new ConcurrentHashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    return map;
  }

  // Cas 5 : Map.of — immutable, max 10 paires
  static Map<String, String> mapImmutableOf() {
    return Map.of("a", "alpha", "b", "beta", "c", "gamma");
  }

  // Cas 6 : Map.ofEntries — immutable, sans limite
  static Map<String, String> mapImmutableEntries() {
    return Map.ofEntries(
      Map.entry("a", "alpha"),
      Map.entry("b", "beta"),
      Map.entry("c", "gamma")
    );
  }

  // Cas 7 : get — retourne null si clé absente
  static String mapGet() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    return map.get("a");
  }

  // Cas 8 : getOrDefault — valeur de repli si clé absente
  static String mapGetOrDefault() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    return map.getOrDefault("z", "default");
  }

  // Cas 9 : containsKey
  static boolean mapContainsKey() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    return map.containsKey("a");
  }

  // Cas 10 : containsValue
  static boolean mapContainsValue() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    return map.containsValue("alpha");
  }

  // Cas 11 : itération via entrySet
  static List<String> mapIterateEntrySet() {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    List<String> result = new ArrayList<>();
    for (Map.Entry<String, String> entry : map.entrySet()) {
      result.add(entry.getKey() + "=" + entry.getValue());
    }
    return result;
  }

  // Cas 12 : itération via keySet
  static List<String> mapIterateKeySet() {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    return new ArrayList<>(map.keySet());
  }

  // Cas 13 : itération via values
  static List<String> mapIterateValues() {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    return new ArrayList<>(map.values());
  }

  // Cas 14 : computeIfAbsent — calcule et insère si clé absente
  static Map<String, Integer> mapComputeIfAbsent() {
    Map<String, Integer> map = new HashMap<>();
    map.computeIfAbsent("hello", k -> k.length());
    return map;
  }

  // Cas 15 : merge — fusionne une valeur existante
  static Map<String, Integer> mapMerge() {
    Map<String, Integer> map = new HashMap<>();
    map.put("a", 1);
    map.merge("a", 2, Integer::sum);
    return map;
  }

  // Cas 16 : replaceAll — transforme toutes les valeurs
  static Map<String, String> mapReplaceAll() {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    map.replaceAll((k, v) -> v.toUpperCase());
    return map;
  }

  // Cas 17 : clé null autorisée dans HashMap
  static boolean mapNullKey() {
    Map<String, String> map = new HashMap<>();
    map.put(null, "nullValue");
    return map.containsKey(null);
  }

  // Cas 18 : size
  static int mapSize() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    map.put("c", "gamma");
    return map.size();
  }

  // Cas 19 : putIfAbsent — n'écrase pas si clé déjà présente
  static Map<String, String> mapPutIfAbsent() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    map.putIfAbsent("a", "OVERWRITE");
    map.putIfAbsent("b", "beta");
    return map;
  }

  // Cas 20 : remove — supprime une entrée
  static Map<String, String> mapRemove() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "alpha");
    map.put("b", "beta");
    map.remove("a");
    return map;
  }
}