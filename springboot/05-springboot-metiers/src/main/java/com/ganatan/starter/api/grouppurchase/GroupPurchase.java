package com.ganatan.starter.api.grouppurchase;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class GroupPurchase {
  private Long id;
  private String productName;
  private int minimumParticipants;
  private int maximumParticipants;
  private LocalDateTime deadline;
  private LocalDateTime creationDate;
  private List<String> participants = new ArrayList<>();

  public GroupPurchase() {
  }

  public GroupPurchase(
    Long id,
    String productName,
    int minimumParticipants,
    int maximumParticipants,
    LocalDateTime deadline) {

    this.id = id;
    this.productName = productName;
    this.minimumParticipants = minimumParticipants;
    this.maximumParticipants = maximumParticipants;
    this.deadline = deadline;
    this.creationDate = LocalDateTime.now();
  }

  public double getCurrentPrice() {
    int count = participants.size();
    if (count >= 15) return 12.0;
    if (count >= 10) return 15.0;
    if (count >= 5) return 18.0;
    return 20.0;
  }

  public String getStatus() {
    LocalDateTime now = LocalDateTime.now();

    if (now.isAfter(deadline)) {
      return "EXPIRED";
    }

    if (participants.size() >= maximumParticipants) {
      return "FULL";
    }

    return "OPEN";
  }

  public boolean joinableOk() {
    LocalDateTime now = LocalDateTime.now();

    if (now.isAfter(deadline)) {
      return false;
    }

    if (participants.size() >= maximumParticipants) {
      return false;
    }

    return true;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public int getMinimumParticipants() {
    return minimumParticipants;
  }

  public int getMaximumParticipants() {
    return maximumParticipants;
  }

  public LocalDateTime getDeadline() {
    return deadline;
  }

  public LocalDateTime getCreationDate() {
    return creationDate;
  }

  public List<String> getParticipants() {
    return participants;
  }
}