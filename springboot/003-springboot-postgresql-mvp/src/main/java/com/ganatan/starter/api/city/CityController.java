package com.ganatan.starter.api.city;

import java.util.List;

import com.ganatan.starter.api.country.CountryService;
import com.ganatan.starter.api.person.PersonResponseDto;
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
@RequestMapping("/cities")
public class CityController {

  private final CityService service;
  private final CountryService countryService;
  private final PersonService personService;

  public CityController(CityService service, CountryService countryService, PersonService personService) {
    this.service = service;
    this.countryService = countryService;
    this.personService = personService;
  }

  @GetMapping
  public List<CityResponseDto> getAll() {
    return service.findAll().stream().map(CityResponseDto::from).toList();
  }

  @GetMapping("/{id}")
  public CityResponseDto getById(@PathVariable Long id) {
    return service.findById(id).map(CityResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CityResponseDto create(@RequestBody CityCreateRequestDto request) {
    Long countryId = request == null ? null : request.getCountryId();
    String name = request == null ? null : request.getName();
    if (countryId == null || name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countryId and name are required");
    }
    if (countryService.findById(countryId).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countryId not found");
    }
    return CityResponseDto.from(service.create(countryId, name.trim()));
  }

  @PutMapping("/{id}")
  public CityResponseDto update(@PathVariable Long id, @RequestBody CityUpdateRequestDto request) {
    Long countryId = request == null ? null : request.getCountryId();
    String name = request == null ? null : request.getName();
    if (countryId == null || name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countryId and name are required");
    }
    if (countryService.findById(countryId).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countryId not found");
    }
    return service.update(id, countryId, name.trim()).map(CityResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!service.delete(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

//  @GetMapping("/{id}/persons")
//  public List<PersonResponseDto> getPersons(@PathVariable Long id) {
//    if (service.findById(id).isEmpty()) {
//      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
//    }
//    return personService.findByCityId(id).stream().map(PersonResponseDto::from).toList();
//  }
}
