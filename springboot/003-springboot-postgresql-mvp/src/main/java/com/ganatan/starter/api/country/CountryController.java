package com.ganatan.starter.api.country;

import java.util.List;

import com.ganatan.starter.api.city.CityResponseDto;
import com.ganatan.starter.api.city.CityService;

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
@RequestMapping("/countries")
public class CountryController {

  private final CountryService service;
  private final CityService cityService;

  public CountryController(CountryService service, CityService cityService) {
    this.service = service;
    this.cityService = cityService;
  }

  @GetMapping
  public List<CountryResponseDto> getAll() {
    return service.findAll().stream().map(CountryResponseDto::from).toList();
  }

  @GetMapping("/{id}")
  public CountryResponseDto getById(@PathVariable Long id) {
    return service.findById(id).map(CountryResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CountryResponseDto create(@RequestBody CountryCreateRequestDto request) {
    String code = request == null ? null : request.getCode();
    String name = request == null ? null : request.getName();
    if (code == null || code.isBlank() || name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "code and name are required");
    }
    return CountryResponseDto.from(service.create(code.trim(), name.trim()));
  }

  @PutMapping("/{id}")
  public CountryResponseDto update(@PathVariable Long id, @RequestBody CountryUpdateRequestDto request) {
    String code = request == null ? null : request.getCode();
    String name = request == null ? null : request.getName();
    if (code == null || code.isBlank() || name == null || name.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "code and name are required");
    }
    return service.update(id, code.trim(), name.trim()).map(CountryResponseDto::from)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!service.delete(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{id}/cities")
  public List<CityResponseDto> getCities(@PathVariable Long id) {
    if (service.findById(id).isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return cityService.findByCountryId(id).stream().map(CityResponseDto::from).toList();
  }
}
