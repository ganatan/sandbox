package com.ganatan.starter.api.media;

public class MediaUpdateRequestDto {

  private String title;
  private Integer year;

  public MediaUpdateRequestDto() {
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
