package com.ganatan.starter.api.mediaperson;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "media_person")
@IdClass(MediaPersonId.class)
public class MediaPersonEntity {

  @Id
  private Long mediaId;

  @Id
  private Long personId;

  private String role;

  public MediaPersonEntity() {
  }

  public MediaPersonEntity(Long mediaId, Long personId, String role) {
    this.mediaId = mediaId;
    this.personId = personId;
    this.role = role;
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
