package com.ganatan.starter.api.grouppurchase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class GroupPurchaseTests {

  @Test
  void setsIdAndName() {
    GroupPurchase groupPurchase = new GroupPurchase(1L, "Bluray Interstellar");

    assertEquals(1L, groupPurchase.getId());
    assertEquals("Bluray Interstellar", groupPurchase.getName());
  }
}