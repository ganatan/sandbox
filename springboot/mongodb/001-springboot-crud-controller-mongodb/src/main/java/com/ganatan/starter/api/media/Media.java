package com.ganatan.starter.api.media;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "media")
public class Media {

  @Id
  private String id;

  private String name;
  private int releaseDate;

  public Media() {}

  public Media(String id, String name, int releaseDate) {
    this.id = id;
    this.name = name;
    this.releaseDate = releaseDate;
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public int getReleaseDate() { return releaseDate; }
  public void setReleaseDate(int releaseDate) { this.releaseDate = releaseDate; }
}