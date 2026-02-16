package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
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
    assertEquals(23, result.size());

    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));
    assertEquals(System.getProperty(JAVA_PROP), result.get("java"));

    assertEquals("alpha", result.get("map_hashmap"));
    assertEquals("first", result.get("map_linkedhashmap_order"));
    assertEquals("apple", result.get("map_treemap_firstkey"));
    assertEquals("alpha", result.get("map_concurrent"));
    assertEquals("alpha", result.get("map_immutable_of"));
    assertEquals("alpha", result.get("map_immutable_entries"));
    assertEquals("alpha", result.get("map_get"));
    assertEquals("default", result.get("map_get_or_default"));
    assertEquals(true, result.get("map_contains_key"));
    assertEquals(true, result.get("map_contains_value"));
    assertEquals(List.of("a=alpha", "b=beta"), result.get("map_entryset"));
    assertEquals(List.of("a", "b"), result.get("map_keyset"));
    assertEquals(List.of("alpha", "beta"), result.get("map_values"));
    assertEquals(5, (Integer) result.get("map_compute_if_absent"));
    assertEquals(3, (Integer) result.get("map_merge"));
    assertEquals("ALPHA", result.get("map_replace_all"));
    assertEquals(true, result.get("map_null_key"));
    assertEquals(3, (Integer) result.get("map_size"));
    assertEquals("alpha", result.get("map_put_if_absent"));
    assertEquals(false, result.get("map_remove"));

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 1 : mapHashMap ---

  @Test
  void mapHashMap_shouldContainExpectedEntries() {
    Map<String, String> result = RootController.mapHashMap();
    assertEquals("alpha", result.get("a"));
    assertEquals("beta", result.get("b"));
    assertEquals("gamma", result.get("c"));
    assertEquals(3, result.size());
  }

  // --- Cas 2 : mapLinkedHashMap ---

  @Test
  void mapLinkedHashMap_shouldPreserveInsertionOrder() {
    Map<String, String> result = RootController.mapLinkedHashMap();
    List<String> keys = new ArrayList<>(result.keySet());
    assertEquals("first", keys.get(0));
    assertEquals("second", keys.get(1));
    assertEquals("third", keys.get(2));
  }

  // --- Cas 3 : mapTreeMap ---

  @Test
  void mapTreeMap_shouldSortKeysByNaturalOrder() {
    Map<String, String> result = RootController.mapTreeMap();
    List<String> keys = new ArrayList<>(result.keySet());
    assertEquals("apple", keys.get(0));
    assertEquals("banana", keys.get(1));
    assertEquals("cherry", keys.get(2));
  }

  // --- Cas 4 : mapConcurrentHashMap ---

  @Test
  void mapConcurrentHashMap_shouldContainExpectedEntries() {
    Map<String, String> result = RootController.mapConcurrentHashMap();
    assertEquals("alpha", result.get("a"));
    assertEquals("beta", result.get("b"));
  }

  // --- Cas 5 : mapImmutableOf ---

  @Test
  void mapImmutableOf_shouldReturnImmutableMap() {
    Map<String, String> result = RootController.mapImmutableOf();
    assertEquals("alpha", result.get("a"));
    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 6 : mapImmutableEntries ---

  @Test
  void mapImmutableEntries_shouldReturnImmutableMap() {
    Map<String, String> result = RootController.mapImmutableEntries();
    assertEquals("alpha", result.get("a"));
    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 7 : mapGet ---

  @Test
  void mapGet_shouldReturnValue_whenKeyExists() {
    assertEquals("alpha", RootController.mapGet());
  }

  // --- Cas 8 : mapGetOrDefault ---

  @Test
  void mapGetOrDefault_shouldReturnDefault_whenKeyAbsent() {
    assertEquals("default", RootController.mapGetOrDefault());
  }

  // --- Cas 9 : mapContainsKey ---

  @Test
  void mapContainsKey_shouldReturnTrue_whenKeyExists() {
    assertTrue(RootController.mapContainsKey());
  }

  // --- Cas 10 : mapContainsValue ---

  @Test
  void mapContainsValue_shouldReturnTrue_whenValueExists() {
    assertTrue(RootController.mapContainsValue());
  }

  // --- Cas 11 : mapIterateEntrySet ---

  @Test
  void mapIterateEntrySet_shouldReturnKeyValuePairs() {
    List<String> result = RootController.mapIterateEntrySet();
    assertEquals(2, result.size());
    assertTrue(result.contains("a=alpha"));
    assertTrue(result.contains("b=beta"));
  }

  // --- Cas 12 : mapIterateKeySet ---

  @Test
  void mapIterateKeySet_shouldReturnKeys() {
    List<String> result = RootController.mapIterateKeySet();
    assertEquals(List.of("a", "b"), result);
  }

  // --- Cas 13 : mapIterateValues ---

  @Test
  void mapIterateValues_shouldReturnValues() {
    List<String> result = RootController.mapIterateValues();
    assertEquals(List.of("alpha", "beta"), result);
  }

  // --- Cas 14 : mapComputeIfAbsent ---

  @Test
  void mapComputeIfAbsent_shouldInsertComputedValue_whenKeyAbsent() {
    Map<String, Integer> result = RootController.mapComputeIfAbsent();
    assertEquals(5, result.get("hello"));
  }

  @Test
  void mapComputeIfAbsent_shouldNotOverwrite_whenKeyPresent() {
    java.util.HashMap<String, Integer> map = new java.util.HashMap<>();
    map.put("hello", 99);
    map.computeIfAbsent("hello", k -> k.length());
    assertEquals(99, map.get("hello"));
  }

  // --- Cas 15 : mapMerge ---

  @Test
  void mapMerge_shouldSumValues_whenKeyExists() {
    Map<String, Integer> result = RootController.mapMerge();
    assertEquals(3, result.get("a"));
  }

  // --- Cas 16 : mapReplaceAll ---

  @Test
  void mapReplaceAll_shouldTransformAllValues() {
    Map<String, String> result = RootController.mapReplaceAll();
    assertEquals("ALPHA", result.get("a"));
    assertEquals("BETA", result.get("b"));
  }

  // --- Cas 17 : mapNullKey ---

  @Test
  void mapNullKey_shouldAllowNullKeyInHashMap() {
    assertTrue(RootController.mapNullKey());
  }

  // --- Cas 18 : mapSize ---

  @Test
  void mapSize_shouldReturnCorrectCount() {
    assertEquals(3, RootController.mapSize());
  }

  // --- Cas 19 : mapPutIfAbsent ---

  @Test
  void mapPutIfAbsent_shouldNotOverwrite_whenKeyExists() {
    Map<String, String> result = RootController.mapPutIfAbsent();
    assertEquals("alpha", result.get("a"));
  }

  @Test
  void mapPutIfAbsent_shouldInsert_whenKeyAbsent() {
    Map<String, String> result = RootController.mapPutIfAbsent();
    assertEquals("beta", result.get("b"));
  }

  // --- Cas 20 : mapRemove ---

  @Test
  void mapRemove_shouldDeleteEntry() {
    Map<String, String> result = RootController.mapRemove();
    assertFalse(result.containsKey("a"));
    assertTrue(result.containsKey("b"));
  }
}