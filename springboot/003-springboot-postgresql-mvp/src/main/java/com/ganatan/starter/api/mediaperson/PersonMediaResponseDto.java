package com.ganatan.starter.api.mediaperson;

public class PersonMediaResponseDto {

  private Long mediaId;
  private String title;
  private Integer year;
  private String role;

  public PersonMediaResponseDto() {
  }

  public PersonMediaResponseDto(Long mediaId, String title, Integer year, String role) {
    this.mediaId = mediaId;
    this.title = title;
    this.year = year;
    this.role = role;
  }

  public Long getMediaId() {
    return mediaId;
  }

  public void setMediaId(Long mediaId) {
    this.mediaId = mediaId;
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

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
