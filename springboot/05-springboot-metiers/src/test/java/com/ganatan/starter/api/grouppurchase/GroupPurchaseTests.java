package com.ganatan.starter.api.grouppurchase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class GroupPurchaseTests {

  @Test
  void calculatesCurrentPriceBasedOnParticipants() {
    GroupPurchase gp = new GroupPurchase(
      1L,
      "Bluray Dune",
      5,
      20,
      LocalDateTime.of(2026, 12, 31, 23, 59, 59)
    );

    gp.getParticipants().add("Alice");
    gp.getParticipants().add("Bob");
    gp.getParticipants().add("Charlie");

    assertEquals(20.0, gp.getCurrentPrice());

    gp.getParticipants().add("Dave");
    gp.getParticipants().add("Eve");

    assertEquals(18.0, gp.getCurrentPrice());
  }
}