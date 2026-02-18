package com.ganatan.starter.api.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "media")
public class Media {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 255)
  private String name;

  @Column(name = "release_date")
  private int releaseDate;

  public Media() {}

  public Media(Long id, String name, int releaseDate) {
    this.id = id;
    this.name = name;
    this.releaseDate = releaseDate;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public int getReleaseDate() { return releaseDate; }
  public void setReleaseDate(int releaseDate) { this.releaseDate = releaseDate; }
}