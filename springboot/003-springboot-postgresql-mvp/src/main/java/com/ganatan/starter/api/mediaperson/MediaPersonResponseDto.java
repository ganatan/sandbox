package com.ganatan.starter.api.mediaperson;

public class MediaPersonResponseDto {

  private Long mediaId;
  private Long personId;
  private String role;

  public MediaPersonResponseDto() {
  }

  public MediaPersonResponseDto(Long mediaId, Long personId, String role) {
    this.mediaId = mediaId;
    this.personId = personId;
    this.role = role;
  }

  public static MediaPersonResponseDto from(MediaPersonEntity e) {
    return new MediaPersonResponseDto(e.getMediaId(), e.getPersonId(), e.getRole());
  }

  public Long getMediaId() {
    return mediaId;
  }

  public void setMediaId(Long mediaId) {
    this.mediaId = mediaId;
  }

  public Long getPersonId() {
    return personId;
  }

  public void setPersonId(Long personId) {
    this.personId = personId;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
