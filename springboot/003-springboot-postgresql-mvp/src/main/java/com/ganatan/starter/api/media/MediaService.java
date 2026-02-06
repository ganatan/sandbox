package com.ganatan.starter.api.media;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MediaService {

  private final MediaRepository repository;

  public MediaService(MediaRepository repository) {
    this.repository = repository;
  }

  public List<MediaEntity> findAll() {
    return repository.findAll();
  }

  public Optional<MediaEntity> findById(Long id) {
    return repository.findById(id);
  }

  public List<MediaEntity> findAllByIds(Iterable<Long> ids) {
    return repository.findAllById(ids);
  }

  @Transactional
  public MediaEntity create(String title, Integer year) {
    return repository.save(new MediaEntity(null, title, year));
  }

  @Transactional
  public Optional<MediaEntity> update(Long id, String title, Integer year) {
    return repository.findById(id).map(existing -> {
      existing.setTitle(title);
      existing.setYear(year);
      return repository.save(existing);
    });
  }

  @Transactional
  public boolean delete(Long id) {
    if (!repository.existsById(id)) {
      return false;
    }
    repository.deleteById(id);
    return true;
  }
}
