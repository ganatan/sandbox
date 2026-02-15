package com.ganatan.mediaworker.projection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("media_read")
public class MediaProjection {

 @Id
 private String id;

 private Long mediaId;
 private String title;
 private String type;
 private Integer releaseYear;

 public Long getMediaId() { return mediaId; }
 public void setMediaId(Long mediaId) { this.mediaId = mediaId; }

 public String getTitle() { return title; }
 public void setTitle(String title) { this.title = title; }

 public String getType() { return type; }
 public void setType(String type) { this.type = type; }

 public Integer getReleaseYear() { return releaseYear; }
 public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }
}
