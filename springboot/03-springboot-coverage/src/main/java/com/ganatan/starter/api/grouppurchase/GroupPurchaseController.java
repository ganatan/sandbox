package com.ganatan.starter.api.grouppurchase;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupPurchaseController {

  private final List<GroupPurchase> groupPurchases = new ArrayList<>();
  private final AtomicLong counter = new AtomicLong(1);

  public GroupPurchaseController() {
    create(new GroupPurchase(null, "Bluray Interstellar"));
    create(new GroupPurchase(null, "Bluray Dune"));
    create(new GroupPurchase(null, "Bluray Justice League"));
    create(new GroupPurchase(null, "Bluray Gladiator"));
  }

  private void create(GroupPurchase groupPurchase) {
    groupPurchase.setId(counter.getAndIncrement());
    groupPurchases.add(groupPurchase);
  }

  @GetMapping("/group-purchases")
  public List<GroupPurchase> getItems() {
    return groupPurchases;
  }

}