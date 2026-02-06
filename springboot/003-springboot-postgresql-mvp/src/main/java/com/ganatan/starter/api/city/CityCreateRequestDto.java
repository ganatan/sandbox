package com.ganatan.starter.api.city;

public class CityCreateRequestDto {

  private Long countryId;
  private String name;

  public CityCreateRequestDto() {
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
