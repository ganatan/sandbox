package com.ganatan.starter.api.customer;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Collection;

import org.junit.jupiter.api.Test;

class CustomerControllerTest {

  @Test
  void getItemsReturnsCustomers() {
    CustomerController controller = new CustomerController();
    Collection<Customer> result = controller.getItems();

    assertNotNull(result);
    assertFalse(result.isEmpty());
    assertEquals(4, result.size());
  }

}
