package com.ganatan.starter.api.mediaperson;

public class MediaPersonResponseWithPersonDto {

  private Long personId;
  private String name;
  private String role;

  public MediaPersonResponseWithPersonDto() {
  }

  public MediaPersonResponseWithPersonDto(Long personId, String name, String role) {
    this.personId = personId;
    this.name = name;
    this.role = role;
  }

  public Long getPersonId() {
    return personId;
  }

  public void setPersonId(Long personId) {
    this.personId = personId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
