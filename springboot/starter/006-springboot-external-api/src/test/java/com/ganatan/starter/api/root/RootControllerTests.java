package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;
import org.junit.jupiter.api.Test;

class RootControllerTests {

  private static final String APP = "springboot-starter";
  private static final String STATUS = "running";
  private static final String JAVA_PROP = "java.version";

  @Test
  void root_shouldReturnImmutableMap_withExpectedKeysAndValues() {
    RootController controller = new RootController();

    Map<String, Object> result = controller.root();

    assertNotNull(result);
    assertEquals(3, result.size());
    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));

    assertTrue(result.containsKey("java"));
    Object java = result.get("java");
    assertNotNull(java);
    assertTrue(java instanceof String);
    assertEquals(System.getProperty(JAVA_PROP), java);

    assertThrows(UnsupportedOperationException.class, () -> result.put("x", "y"));
  }

  @Test
  void info_shouldReturnRecord_withExpectedValues() {
    RootController controller = new RootController();

    RootController.ApiInfo info = controller.rootWithRecord();

    assertNotNull(info);
    assertEquals(APP, info.application());
    assertEquals(STATUS, info.status());

    String java = info.java();
    assertNotNull(java);
    assertFalse(java.isBlank());
    assertEquals(System.getProperty(JAVA_PROP), java);
  }

  @Test
  void status_shouldReturnMutableMap_withExpectedKeysAndValues() {
    RootController controller = new RootController();

    Map<String, Object> result = controller.rootWithHashMap();

    assertNotNull(result);
    assertEquals(3, result.size());
    assertEquals(APP, result.get("application"));
    assertEquals(STATUS, result.get("status"));

    assertTrue(result.containsKey("java"));
    Object java = result.get("java");
    assertNotNull(java);
    assertTrue(java instanceof String);
    assertEquals(System.getProperty(JAVA_PROP), java);

    assertDoesNotThrow(() -> result.put("x", "y"));
    assertEquals("y", result.get("x"));
  }

  @Test
  void allEndpoints_shouldBeConsistent_onCommonFields() {
    RootController controller = new RootController();

    Map<String, Object> root = controller.root();
    RootController.ApiInfo info = controller.rootWithRecord();
    Map<String, Object> status = controller.rootWithHashMap();

    String java = System.getProperty(JAVA_PROP);

    assertEquals(APP, root.get("application"));
    assertEquals(APP, status.get("application"));
    assertEquals(APP, info.application());

    assertEquals(STATUS, root.get("status"));
    assertEquals(STATUS, status.get("status"));
    assertEquals(STATUS, info.status());

    assertEquals(java, root.get("java"));
    assertEquals(java, status.get("java"));
    assertEquals(java, info.java());
  }
}