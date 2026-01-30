package com.ganatan.starter.api.customer;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CustomerTest {

  @Test
  void constructor_setsIdAndName() {
    Customer customer = new Customer(1L, "Chris Martin");

    assertEquals(1L, customer.getId());
    assertEquals("Chris Martin", customer.getName());
  }

}
