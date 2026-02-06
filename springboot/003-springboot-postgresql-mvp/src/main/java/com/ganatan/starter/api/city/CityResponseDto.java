package com.ganatan.starter.api.city;

public class CityResponseDto {

  private Long id;
  private Long countryId;
  private String name;

  public CityResponseDto() {
  }

  public CityResponseDto(Long id, Long countryId, String name) {
    this.id = id;
    this.countryId = countryId;
    this.name = name;
  }

  public static CityResponseDto from(CityEntity e) {
    return new CityResponseDto(e.getId(), e.getCountryId(), e.getName());
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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
