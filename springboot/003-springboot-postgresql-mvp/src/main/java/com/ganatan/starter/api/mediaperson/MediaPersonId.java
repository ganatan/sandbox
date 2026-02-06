package com.ganatan.starter.api.mediaperson;

import java.io.Serializable;
import java.util.Objects;

public class MediaPersonId implements Serializable {

  private Long mediaId;
  private Long personId;

  public MediaPersonId() {
  }

  public MediaPersonId(Long mediaId, Long personId) {
    this.mediaId = mediaId;
    this.personId = personId;
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    MediaPersonId that = (MediaPersonId) o;
    return Objects.equals(mediaId, that.mediaId) && Objects.equals(personId, that.personId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(mediaId, personId);
  }
}
