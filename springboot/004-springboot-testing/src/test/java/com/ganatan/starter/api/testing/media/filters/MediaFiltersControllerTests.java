package com.ganatan.starter.api.testing.media.filters;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

public class MediaFiltersControllerTests {

  @Test
  public void testGet() {
    MediaFiltersController controller = new MediaFiltersController();

    List<MediaFiltersController.Film> result = controller.get();

    assertEquals(3, result.size());
    assertEquals("Alien", result.get(0).title());
    assertEquals("Blade Runner", result.get(1).title());
    assertEquals("Zodiac", result.get(2).title());
  }
}