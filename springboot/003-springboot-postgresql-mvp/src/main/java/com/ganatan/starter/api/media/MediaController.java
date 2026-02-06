package com.ganatan.starter.api.media;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ganatan.starter.api.mediaperson.MediaPersonEntity;
import com.ganatan.starter.api.mediaperson.MediaPersonLinkRequestDto;
import com.ganatan.starter.api.mediaperson.MediaPersonResponseWithPersonDto;
import com.ganatan.starter.api.mediaperson.MediaPersonService;
import com.ganatan.starter.api.person.PersonEntity;
import com.ganatan.starter.api.person.PersonService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/media")
public class MediaController {

  private final MediaService service;
  private final PersonService personService;
  private final MediaPersonService mediaPersonService;

  public MediaController(MediaService service, PersonService personService, MediaPersonService mediaPersonService) {
    this.service = service;
    this.personService = personService;
    this.mediaPersonService = mediaPersonService;
  }

  @GetMapping
  public List<MediaResponseDto> getAll() {
    return service.findAll().stream().map(MediaResponseDto::from).toList();
  }

  @GetMapping("/{id}")
  public MediaResponseDto getById(@PathVariable Long id) {
    return service.findById(id).map(MediaResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MediaResponseDto create(@RequestBody MediaCreateRequestDto request) {
    String title = request == null ? null : request.getTitle();
    Integer year = request == null ? null : request.getYear();
    if (title == null || title.isBlank() || year == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "title and year are required");
    }
    return MediaResponseDto.from(service.create(title.trim(), year));
  }

  @PutMapping("/{id}")
  public MediaResponseDto update(@PathVariable Long id, @RequestBody MediaUpdateRequestDto request) {
    String title = request == null ? null : request.getTitle();
    Integer year = request == null ? null : request.getYear();
    if (title == null || title.isBlank() || year == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "title and year are required");
    }
    return service.update(id, title.trim(), year).map(MediaResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!service.delete(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{id}/persons")
  public List<MediaPersonResponseWithPersonDto> getPersons(@PathVariable Long id) {
    if (service.findById(id).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    List<MediaPersonEntity> links = mediaPersonService.findByMediaId(id);
    List<Long> personIds = links.stream().map(MediaPersonEntity::getPersonId).distinct().toList();
    Map<Long, PersonEntity> personsById = personService.findAll().stream()
      .filter(p -> personIds.contains(p.getId()))
      .collect(Collectors.toMap(PersonEntity::getId, p -> p));
    return links.stream()
      .map(l -> {
        PersonEntity p = personsById.get(l.getPersonId());
        return new MediaPersonResponseWithPersonDto(l.getPersonId(), p == null ? null : p.getName(), l.getRole());
      })
      .toList();
  }

  @PostMapping("/{id}/persons/{personId}")
  public void linkPerson(@PathVariable Long id, @PathVariable Long personId, @RequestBody MediaPersonLinkRequestDto request) {
    if (service.findById(id).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    if (personService.findById(personId).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "personId not found");
    }
    String role = request == null ? null : request.getRole();
    mediaPersonService.link(id, personId, role == null ? null : role.trim());
  }

  @DeleteMapping("/{id}/persons/{personId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void unlinkPerson(@PathVariable Long id, @PathVariable Long personId) {
    if (service.findById(id).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    if (!mediaPersonService.unlink(id, personId)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }
}
