package com.ganatan.mediaworker.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.ganatan.mediaworker.projection.MediaProjection;
import com.ganatan.mediaworker.service.MediaProjectionService;

@Component
public class MediaEventConsumer {

 private final MediaProjectionService service;

 public MediaEventConsumer(MediaProjectionService service) {
  this.service = service;
 }

 @KafkaListener(topics = "media-events", groupId = "media-worker")
 public void consume(String message) {
  MediaProjection projection = new MediaProjection();
  projection.setMediaId(1L);
  projection.setTitle(message);
  projection.setType("MOVIE");
  projection.setReleaseYear(2024);
  service.save(projection);
 }
}
