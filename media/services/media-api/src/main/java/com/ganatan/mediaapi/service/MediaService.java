
package com.ganatan.mediaapi.service;

import com.ganatan.mediaapi.domain.MediaEntity;
import com.ganatan.mediaapi.domain.MediaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MediaService {

 private final MediaRepository repository;

 public MediaService(MediaRepository repository) {
  this.repository = repository;
 }

 public Long create(String name, LocalDate releaseDate) {
  MediaEntity entity = new MediaEntity();
  entity.setName(name);
  entity.setReleaseDate(releaseDate);
  return repository.save(entity).getId();
 }
}
