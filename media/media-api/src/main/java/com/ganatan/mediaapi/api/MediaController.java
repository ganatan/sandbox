package com.ganatan.mediaapi.api;

import com.ganatan.mediaapi.api.dto.*;
import com.ganatan.mediaapi.domain.MediaEntity;
import com.ganatan.mediaapi.domain.MediaRepository;
import com.ganatan.mediaapi.service.MediaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin/media")
public class MediaController {

  private final MediaService service;
  private final MediaRepository repository;

  public MediaController(MediaService service, MediaRepository repository) {
    this.service = service;
    this.repository = repository;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MediaCreateResponseDto create(@RequestBody MediaCreateRequestDto request) {
    LocalDate releaseDate = LocalDate.now();
    System.out.println(request);
//    Long id = service.create(request.name, request.release_date);
    Long id = service.create(request.name, releaseDate);
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





//
//package com.ganatan.mediaapi.api;
//
//import com.ganatan.mediaapi.api.dto.*;
//import com.ganatan.mediaapi.service.MediaService;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.HttpStatus;
//import java.time.LocalDate;
//
//@RestController
//@RequestMapping("/admin/media")
//public class MediaController {
//
// private final MediaService service;
//
// public MediaController(MediaService service) {
//  this.service = service;
// }
//
// @PostMapping
// @ResponseStatus(HttpStatus.CREATED)
// public MediaCreateResponseDto create(@RequestBody MediaCreateRequestDto request) {
//  Long id = service.create(request.name, request.release_date);
//  return new MediaCreateResponseDto(id);
// }
//}
