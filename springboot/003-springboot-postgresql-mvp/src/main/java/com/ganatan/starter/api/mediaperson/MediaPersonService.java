package com.ganatan.starter.api.mediaperson;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MediaPersonService {

  private final MediaPersonRepository repository;

  public MediaPersonService(MediaPersonRepository repository) {
    this.repository = repository;
  }

  public List<MediaPersonEntity> findByPersonId(Long personId) {
    return repository.findByPersonId(personId);
  }

  public List<MediaPersonEntity> findByMediaId(Long mediaId) {
    return repository.findByMediaId(mediaId);
  }

  @Transactional
  public MediaPersonEntity link(Long mediaId, Long personId, String role) {
    return repository.save(new MediaPersonEntity(mediaId, personId, role));
  }

  @Transactional
  public boolean unlink(Long mediaId, Long personId) {
    if (!repository.existsByMediaIdAndPersonId(mediaId, personId)) {
      return false;
    }
    repository.deleteByMediaIdAndPersonId(mediaId, personId);
    return true;
  }
}
