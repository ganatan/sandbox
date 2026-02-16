package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    assertEquals(25, result.size());

    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));
    assertEquals(System.getProperty(JAVA_PROP), result.get("java"));

    assertEquals(List.of(2, 4, 6),           result.get("stream_filter"));
    assertEquals(List.of(2, 4, 6, 8, 10),    result.get("stream_map"));
    assertEquals(List.of(1, 2, 3, 4, 5, 6),  result.get("stream_flatmap"));
    assertEquals(15,                          result.get("stream_reduce"));
    assertEquals(List.of(1, 2, 3, 4, 5),     result.get("stream_sorted"));
    assertEquals(List.of(1, 2, 3, 4),        result.get("stream_distinct"));
    assertEquals(List.of(1, 2, 3),           result.get("stream_limit"));
    assertEquals(List.of(3, 4, 5),           result.get("stream_skip"));
    assertEquals(3L,                          result.get("stream_count"));
    assertEquals(4,                           result.get("stream_findfirst"));
    assertEquals(true,                        result.get("stream_anymatch"));
    assertEquals(true,                        result.get("stream_allmatch"));
    assertEquals(true,                        result.get("stream_nonematch"));
    assertEquals(1,                           result.get("stream_min"));
    assertEquals(9,                           result.get("stream_max"));
    assertEquals(15,                          result.get("stream_sum"));
    assertEquals(3.0,                         result.get("stream_average"));
    assertEquals(List.of(2, 4, 6),           result.get("stream_partition"));
    assertEquals(List.of("a, b, c"),          result.get("stream_joining"));
    assertEquals(List.of(10, 20, 30),         result.get("stream_peek"));
    assertEquals(List.of(10, 20, 30),         result.get("stream_of"));

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  // --- Cas 1 : streamFilter ---

  @Test
  void streamFilter_shouldReturnEvenNumbers() {
    assertEquals(List.of(2, 4, 6), RootController.streamFilter());
  }

  // --- Cas 2 : streamMap ---

  @Test
  void streamMap_shouldDoubleEachElement() {
    assertEquals(List.of(2, 4, 6, 8, 10), RootController.streamMap());
  }

  // --- Cas 3 : streamFlatMap ---

  @Test
  void streamFlatMap_shouldFlattenNestedLists() {
    assertEquals(List.of(1, 2, 3, 4, 5, 6), RootController.streamFlatMap());
  }

  // --- Cas 4 : streamReduce ---

  @Test
  void streamReduce_shouldReturnSum() {
    assertEquals(15, RootController.streamReduce());
  }

  // --- Cas 5 : streamSorted ---

  @Test
  void streamSorted_shouldReturnSortedList() {
    assertEquals(List.of(1, 2, 3, 4, 5), RootController.streamSorted());
  }

  // --- Cas 6 : streamDistinct ---

  @Test
  void streamDistinct_shouldRemoveDuplicates() {
    assertEquals(List.of(1, 2, 3, 4), RootController.streamDistinct());
  }

  // --- Cas 7 : streamLimit ---

  @Test
  void streamLimit_shouldTruncateToThreeElements() {
    assertEquals(List.of(1, 2, 3), RootController.streamLimit());
  }

  // --- Cas 8 : streamSkip ---

  @Test
  void streamSkip_shouldIgnoreFirstTwoElements() {
    assertEquals(List.of(3, 4, 5), RootController.streamSkip());
  }

  // --- Cas 9 : streamCount ---

  @Test
  void streamCount_shouldReturnNumberOfMatchingElements() {
    assertEquals(3L, RootController.streamCount());
  }

  // --- Cas 10 : streamFindFirst ---

  @Test
  void streamFindFirst_shouldReturnFirstMatchingElement() {
    Optional<Integer> result = RootController.streamFindFirst();
    assertTrue(result.isPresent());
    assertEquals(4, result.get());
  }

  // --- Cas 11 : streamAnyMatch ---

  @Test
  void streamAnyMatch_shouldReturnTrue_whenAtLeastOneMatches() {
    assertTrue(RootController.streamAnyMatch());
  }

  // --- Cas 12 : streamAllMatch ---

  @Test
  void streamAllMatch_shouldReturnTrue_whenAllMatch() {
    assertTrue(RootController.streamAllMatch());
  }

  // --- Cas 13 : streamNoneMatch ---

  @Test
  void streamNoneMatch_shouldReturnTrue_whenNoneMatch() {
    assertTrue(RootController.streamNoneMatch());
  }

  // --- Cas 14 : streamMin ---

  @Test
  void streamMin_shouldReturnSmallestElement() {
    Optional<Integer> result = RootController.streamMin();
    assertTrue(result.isPresent());
    assertEquals(1, result.get());
  }

  // --- Cas 15 : streamMax ---

  @Test
  void streamMax_shouldReturnLargestElement() {
    Optional<Integer> result = RootController.streamMax();
    assertTrue(result.isPresent());
    assertEquals(9, result.get());
  }

  // --- Cas 16 : streamSum ---

  @Test
  void streamSum_shouldReturnTotalSum() {
    assertEquals(15, RootController.streamSum());
  }

  // --- Cas 17 : streamAverage ---

  @Test
  void streamAverage_shouldReturnMeanValue() {
    assertEquals(3.0, RootController.streamAverage());
  }

  // --- Cas 18 : streamPartitionBy ---

  @Test
  void streamPartitionBy_shouldSeparateEvenAndOdd() {
    Map<Boolean, List<Integer>> result = RootController.streamPartitionBy();
    assertEquals(List.of(2, 4, 6), result.get(true));
    assertEquals(List.of(1, 3, 5), result.get(false));
  }

  // --- Cas 19 : streamGroupBy ---

  @Test
  void streamGroupBy_shouldGroupByStringLength() {
    Map<Integer, List<String>> result = RootController.streamGroupBy();
    assertEquals(List.of("a"), result.get(1));
    assertEquals(3, result.get(2).size());
    assertEquals(List.of("ddd"), result.get(3));
  }

  // --- Cas 20 : streamCollectJoining ---

  @Test
  void streamCollectJoining_shouldJoinWithSeparator() {
    List<String> result = RootController.streamCollectJoining();
    assertEquals("a, b, c", result.get(0));
  }

  // --- Cas 21 : streamPeek ---

  @Test
  void streamPeek_shouldNotAlterElements() {
    List<Integer> result = RootController.streamPeek();
    assertEquals(List.of(10, 20, 30), result);
  }

  // --- Cas 22 : streamOf ---

  @Test
  void streamOf_shouldCreateStreamFromValues() {
    assertEquals(List.of(10, 20, 30), RootController.streamOf());
  }
}