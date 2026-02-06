package com.ganatan.starter.api.person;

public class PersonResponseDto {

  private Long id;
  private String name;

  public PersonResponseDto() {
  }

  public PersonResponseDto(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public static PersonResponseDto from(PersonEntity entity) {
    return new PersonResponseDto(entity.getId(), entity.getName());
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