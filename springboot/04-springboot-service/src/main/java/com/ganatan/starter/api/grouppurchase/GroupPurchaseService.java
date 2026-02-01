package com.ganatan.starter.api.grouppurchase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service
public class GroupPurchaseService {

  private final Map<Long, GroupPurchase> groupPurchases = new HashMap<>();
  private final AtomicLong counter = new AtomicLong(1);

  public GroupPurchaseService() {
    create(new GroupPurchase(null, "Bluray Interstellar"));
    create(new GroupPurchase(null, "Bluray Dune"));
    create(new GroupPurchase(null, "Bluray Justice League"));
    create(new GroupPurchase(null, "Bluray Gladiator"));
  }

  private GroupPurchase create(GroupPurchase groupPurchase) {
    Long id = counter.getAndIncrement();
    groupPurchase.setId(id);
    groupPurchases.put(id, groupPurchase);
    return groupPurchase;
  }

  public List<GroupPurchase> getItems() {
    return new ArrayList<>(groupPurchases.values());
  }

  public GroupPurchase getItemById(long id) {
    return groupPurchases.get(id);
  }

}
