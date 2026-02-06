package com.ganatan.starter.api.city;

public class CityUpdateRequestDto {

  private Long countryId;
  private String name;

  public CityUpdateRequestDto() {
  }

  public Long getCountryId() {
    return countryId;
  }

  public void setCountryId(Long countryId) {
    this.countryId = countryId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
