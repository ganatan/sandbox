package com.ganatan.starter.api.grouppurchase;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;

class GroupPurchaseControllerTests {

  @Test
  void getItemsReturnsGroupPurchases() {
    GroupPurchaseService service = new GroupPurchaseService();
    GroupPurchaseController controller = new GroupPurchaseController(service);

    List<GroupPurchase> result = controller.getItems();

    assertNotNull(result);
    assertFalse(result.isEmpty());
  }

}
