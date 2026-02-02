package com.ganatan.starter.api;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, Object> root() {
    return Map.of(
      "application", "springmvc-starter",
      "java", System.getProperty("java.version")
    );
  }
}
