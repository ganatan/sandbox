package com.ganatan.mediaapi.api;

import com.ganatan.mediaapi.api.dto.*;
import com.ganatan.mediaapi.domain.MediaEntity;
import com.ganatan.mediaapi.domain.MediaRepository;
import com.ganatan.mediaapi.kafka.KafkaProducerService;
import com.ganatan.mediaapi.kafka.event.EventEnvelope;
import com.ganatan.mediaapi.kafka.event.MediaCreatedPayloadV1;
import com.ganatan.mediaapi.service.MediaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/media")
public class MediaController {

  private final MediaService service;
  private final MediaRepository repository;
  private final KafkaProducerService kafka;

  public MediaController(MediaService service, MediaRepository repository, KafkaProducerService kafka) {
    this.service = service;
    this.repository = repository;
    this.kafka = kafka;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MediaCreateResponseDto create(@RequestBody MediaCreateRequestDto request) {
    LocalDate releaseDate = LocalDate.now();
    Long id = service.create(request.name, releaseDate);

    MediaCreatedPayloadV1 payload = new MediaCreatedPayloadV1(id, request.name, releaseDate);

    EventEnvelope<MediaCreatedPayloadV1> event = new EventEnvelope<>(
      UUID.randomUUID().toString(),
      "MediaCreated",
      Instant.now(),
      UUID.randomUUID().toString(),
      String.valueOf(id),
      "v1",
      payload
    );

    kafka.sendJson("media-events", String.valueOf(id), event);

    return new MediaCreateResponseDto(id);
  }

  @GetMapping
  public List<MediaEntity> getAll() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  public MediaEntity getById(@PathVariable Long id) {
    return repository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }
}




//package com.ganatan.mediaapi.api;
//
//import com.ganatan.mediaapi.api.dto.*;
//import com.ganatan.mediaapi.domain.MediaEntity;
//import com.ganatan.mediaapi.domain.MediaRepository;
//import com.ganatan.mediaapi.service.MediaService;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.time.LocalDate;
//import java.util.Date;
//import java.util.List;
//
//@RestController
//@RequestMapping("/admin/media")
//public class MediaController {
//
//  private final MediaService service;
//  private final MediaRepository repository;
//
//  public MediaController(MediaService service, MediaRepository repository) {
//    this.service = service;
//    this.repository = repository;
//  }
//
//  @PostMapping
//  @ResponseStatus(HttpStatus.CREATED)
//  public MediaCreateResponseDto create(@RequestBody MediaCreateRequestDto request) {
//    LocalDate releaseDate = LocalDate.now();
//    System.out.println(request);
//    Long id = service.create(request.name, releaseDate);
//    return new MediaCreateResponseDto(id);
//  }
//
//  @GetMapping
//  public List<MediaEntity> getAll() {
//    return repository.findAll();
//  }
//
//  @GetMapping("/{id}")
//  public MediaEntity getById(@PathVariable Long id) {
//    return repository.findById(id)
//      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//  }
//}
//
//
//
//
