package com.ganatan.starter.api.media;

public class MediaCreateRequestDto {

  private String title;
  private Integer year;

  public MediaCreateRequestDto() {
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
  }
}
