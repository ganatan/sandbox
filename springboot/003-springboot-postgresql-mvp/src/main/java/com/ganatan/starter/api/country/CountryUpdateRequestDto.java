package com.ganatan.starter.api.country;

public class CountryUpdateRequestDto {

  private String code;
  private String name;

  public CountryUpdateRequestDto() {
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
