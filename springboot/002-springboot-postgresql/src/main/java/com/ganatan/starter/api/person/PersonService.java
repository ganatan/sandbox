package com.ganatan.starter.api.person;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PersonService {

  private final PersonRepository repository;

  public PersonService(PersonRepository repository) {
    this.repository = repository;
  }

  public List<PersonEntity> findAll() {
    return repository.findAll();
  }

  public Optional<PersonEntity> findById(Long id) {
    return repository.findById(id);
  }

  @Transactional
  public PersonEntity create(String name) {
    return repository.save(new PersonEntity(null, name));
  }

  @Transactional
  public Optional<PersonEntity> update(Long id, String name) {
    return repository.findById(id).map(existing -> {
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
