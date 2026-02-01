package com.ganatan.starter.api.grouppurchase;

public class GroupPurchase {

  private Long id;
  private String name;

  public GroupPurchase() {
  }

  public GroupPurchase(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}