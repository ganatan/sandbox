package com.ganatan.starter.api.person;

import java.util.List;

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
@RequestMapping("/persons")
public class PersonController {

  private final PersonService service;

  public PersonController(PersonService service) {
    this.service = service;
  }

  @GetMapping
  public List<PersonResponseDto> getAll() {
    return service.findAll().stream().map(PersonResponseDto::from).toList();
  }

  @GetMapping("/{id}")
  public PersonResponseDto getById(@PathVariable Long id) {
    return service.findById(id)
      .map(PersonResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  public PersonResponseDto create(@RequestBody PersonCreateRequestDto request) {
    String name = request == null ? null : request.getName();
    if (name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name is required");
    }
    return PersonResponseDto.from(service.create(name.trim()));
  }

  @PutMapping("/{id}")
  public PersonResponseDto update(@PathVariable Long id, @RequestBody PersonUpdateRequestDto request) {
    String name = request == null ? null : request.getName();
    if (name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name is required");
    }
    return service.update(id, name.trim())
      .map(PersonResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

//  @DeleteMapping("/{id}")
//  public void delete(@PathVariable Long id) {
//    if (!service.delete(id)) {
//      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
//    }
//  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!service.delete(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }
}