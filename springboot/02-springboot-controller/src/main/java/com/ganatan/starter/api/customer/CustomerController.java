package com.ganatan.starter.api.customer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/customers")
public class CustomerController {

  private final Map<Long, Customer> customers = new HashMap<>();
  private final AtomicLong counter = new AtomicLong(1);

  public CustomerController() {
    create(new Customer(null, "Chris Martin"));
    create(new Customer(null, "Dave Grohl"));
    create(new Customer(null, "Roland Orzabal"));
    create(new Customer(null, "Adam Levine"));
  }

  @GetMapping
  public Collection<Customer> getAll() {
    return customers.values();
  }

  private void create(Customer customer) {
    long id = counter.getAndIncrement();
    customer.setId(id);
    customers.put(id, customer);
  }

}
