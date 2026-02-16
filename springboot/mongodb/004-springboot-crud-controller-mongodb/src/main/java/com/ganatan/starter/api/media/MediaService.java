package com.ganatan.starter.api.media;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MediaService {

  private final MediaRepository mediaRepository;

  public MediaService(MediaRepository mediaRepository) {
    this.mediaRepository = mediaRepository;
  }

  public List<Media> findAll() {
    return mediaRepository.findAll();
  }

  public Media findById(String id) {
    return mediaRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public Media create(Media media) {
    return mediaRepository.save(media);
  }

  public Media update(String id, Media modified) {
    Media existing = findById(id);
    existing.setMediaId(modified.getMediaId());
    existing.setTitle(modified.getTitle());
    existing.setType(modified.getType());
    existing.setReleaseYear(modified.getReleaseYear());
    existing.setPersons(modified.getPersons());
    return mediaRepository.save(existing);
  }

  public void delete(String id) {
    Media existing = findById(id);
    mediaRepository.delete(existing);
  }
}