package com.ganatan.starter.api.media;

public class MediaResponseDto {

  private Long id;
  private String title;
  private Integer year;

  public MediaResponseDto() {
  }

  public MediaResponseDto(Long id, String title, Integer year) {
    this.id = id;
    this.title = title;
    this.year = year;
  }

  public static MediaResponseDto from(MediaEntity e) {
    return new MediaResponseDto(e.getId(), e.getTitle(), e.getYear());
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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
