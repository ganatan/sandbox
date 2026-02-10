
package com.ganatan.mediaapi.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "media")
public class MediaEntity {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String name;

 @Column(name = "release_date")
 private LocalDate releaseDate;

 public Long getId() { return id; }
 public String getName() { return name; }
 public void setName(String name) { this.name = name; }
 public LocalDate getReleaseDate() { return releaseDate; }
 public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
}
