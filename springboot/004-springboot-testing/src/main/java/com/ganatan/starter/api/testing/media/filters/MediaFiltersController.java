package com.ganatan.starter.api.testing.media.filters;

import java.util.Comparator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/media/filters")
public class MediaFiltersController {

  private static final List<Film> FILMS = List.of(
    new Film(3L, "Zodiac"),
    new Film(1L, "Alien"),
    new Film(2L, "Blade Runner")
  );

  @GetMapping
  public List<Film> get() {
    return FILMS.stream()
      .sorted(Comparator.comparing(Film::title, String.CASE_INSENSITIVE_ORDER))
      .toList();
  }

  public record Film(Long id, String title) {
  }
}
