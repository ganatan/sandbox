package com.ganatan.starter.api.country;

public class CountryResponseDto {

  private Long id;
  private String code;
  private String name;

  public CountryResponseDto() {
  }

  public CountryResponseDto(Long id, String code, String name) {
    this.id = id;
    this.code = code;
    this.name = name;
  }

  public static CountryResponseDto from(CountryEntity e) {
    return new CountryResponseDto(e.getId(), e.getCode(), e.getName());
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
