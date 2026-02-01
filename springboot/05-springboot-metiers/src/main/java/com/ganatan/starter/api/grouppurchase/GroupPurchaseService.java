package com.ganatan.starter.api.grouppurchase;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class GroupPurchaseService {

  private final Map<Long, GroupPurchase> groupPurchases = new HashMap<>();

  public GroupPurchaseService() {
    GroupPurchase gp = new GroupPurchase(
      1L,
      "Bluray Dune",
      5,
      6,
      LocalDateTime.of(2026, 3, 31, 23, 59, 59)
    );
    gp.getParticipants().add("John");
    gp.getParticipants().add("Paul");
    gp.getParticipants().add("Ringo");
    gp.getParticipants().add("George");
    groupPurchases.put(1L, gp);
  }

  public List<GroupPurchase> getItems() {
    return new ArrayList<>(groupPurchases.values());
  }

  public GroupPurchase getItemById(long id) {
    return groupPurchases.get(id);
  }
}

