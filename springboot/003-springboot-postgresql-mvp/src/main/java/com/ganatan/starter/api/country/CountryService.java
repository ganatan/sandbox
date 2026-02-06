package com.ganatan.starter.api.country;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CountryService {

  private final CountryRepository repository;

  public CountryService(CountryRepository repository) {
    this.repository = repository;
  }

  public List<CountryEntity> findAll() {
    return repository.findAll();
  }

  public Optional<CountryEntity> findById(Long id) {
    return repository.findById(id);
  }

  @Transactional
  public CountryEntity create(String code, String name) {
    return repository.save(new CountryEntity(null, code, name));
  }

  @Transactional
  public Optional<CountryEntity> update(Long id, String code, String name) {
    return repository.findById(id).map(existing -> {
      existing.setCode(code);
      existing.setName(name);
      return repository.save(existing);
    });
  }

  @Transactional
  public boolean delete(Long id) {
    if (!repository.existsById(id)) {
      return false;
    }
    repository.deleteById(id);
    return true;
  }
}
