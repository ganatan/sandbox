package com.ganatan.mediaworker.service;

import org.springframework.stereotype.Service;
import com.ganatan.mediaworker.projection.MediaProjection;
import com.ganatan.mediaworker.repository.MediaProjectionRepository;

@Service
public class MediaProjectionService {

 private final MediaProjectionRepository repository;

 public MediaProjectionService(MediaProjectionRepository repository) {
  this.repository = repository;
 }

 public void save(MediaProjection projection) {
  repository.save(projection);
 }
}
