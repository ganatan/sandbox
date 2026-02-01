package com.ganatan.starter.api.grouppurchase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Collection;

import org.junit.jupiter.api.Test;

class GroupPurchaseControllerTests {

  @Test
  void getItemsReturnsGroupPurchases() {
    GroupPurchaseController controller = new GroupPurchaseController();
    Collection<GroupPurchase> result = controller.getItems();

    assertNotNull(result);
    assertFalse(result.isEmpty());
    assertEquals(4, result.size());
  }

}