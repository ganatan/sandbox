package com.ganatan.starter.api.root;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Map;

import org.junit.jupiter.api.Test;

class RootControllerTests {

  @Test
  void rootReturnsApplicationInfo() {
    RootController controller = new RootController();
    Map<String, Object> result = controller.root();

    assertNotNull(result);
    assertEquals("springboot-starter", result.get("application"));
    assertTrue(result.containsKey("java"));
  }

}