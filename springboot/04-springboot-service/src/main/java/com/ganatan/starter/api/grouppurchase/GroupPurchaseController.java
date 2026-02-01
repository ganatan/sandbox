package com.ganatan.starter.api.grouppurchase;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class GroupPurchaseController {

  private final GroupPurchaseService service;

  public GroupPurchaseController(GroupPurchaseService service) {
    this.service = service;
  }

  @GetMapping("/group-purchases")
  public List<GroupPurchase> getItems() {
    return service.getItems();
  }

  @GetMapping("/group-purchases/{id}")
  public GroupPurchase getItemById(@PathVariable long id) {
    GroupPurchase groupPurchase = service.getItemById(id);

    if (groupPurchase == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "GroupPurchase not found");
    }

    return groupPurchase;
  }


}
