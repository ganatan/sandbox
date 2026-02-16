package com.ganatan.starter.api.media;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "media_read")
public class Media {

  @Id
  private String id;
  private int mediaId;
  private String title;
  private String type;
  private int releaseYear;
  private List<String> persons;

  public Media() {}

  public Media(String id, int mediaId, String title, String type, int releaseYear, List<String> persons) {
    this.id = id;
    this.mediaId = mediaId;
    this.title = title;
    this.type = type;
    this.releaseYear = releaseYear;
    this.persons = persons;
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public int getMediaId() { return mediaId; }
  public void setMediaId(int mediaId) { this.mediaId = mediaId; }

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public String getType() { return type; }
  public void setType(String type) { this.type = type; }

  public int getReleaseYear() { return releaseYear; }
  public void setReleaseYear(int releaseYear) { this.releaseYear = releaseYear; }

  public List<String> getPersons() { return persons; }
  public void setPersons(List<String> persons) { this.persons = persons; }
}