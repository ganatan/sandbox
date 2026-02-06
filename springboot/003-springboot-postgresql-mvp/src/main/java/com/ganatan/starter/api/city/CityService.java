package com.ganatan.starter.api.city;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CityService {

  private final CityRepository repository;

  public CityService(CityRepository repository) {
    this.repository = repository;
  }

  @Transactional(readOnly = true)
  public List<CityEntity> findAll() {
    return repository.findAll();
  }

  @Transactional(readOnly = true)
  public Optional<CityEntity> findById(Long id) {
    return repository.findById(id);
  }

  @Transactional(readOnly = true)
  public List<CityEntity> findByCountryId(Long countryId) {
    return repository.findByCountryId(countryId);
  }

  @Transactional
  public CityEntity create(Long countryId, String name) {
    CityEntity entity = new CityEntity();
    entity.setCountryId(countryId);
    entity.setName(name);
    return repository.save(entity);
  }

  @Transactional
  public Optional<CityEntity> update(Long id, Long countryId, String name) {
    Optional<CityEntity> existingOpt = repository.findById(id);
    if (existingOpt.isEmpty()) {
      return Optional.empty();
    }
    CityEntity existing = existingOpt.get();
    existing.setCountryId(countryId);
    existing.setName(name);
    return Optional.of(repository.save(existing));
  }

  @Transactional
  public boolean delete(Long id) {
    Optional<CityEntity> existingOpt = repository.findById(id);
    if (existingOpt.isEmpty()) {
      return false;
    }
    repository.delete(existingOpt.get());
    return true;
  }
}



//package com.ganatan.starter.api.city;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class CityService {
//
//  private final CityRepository repository;
//
//  public CityService(CityRepository repository) {
//    this.repository = repository;
//  }
//
//  public List<CityEntity> findAll() {
//    return repository.findAll();
//  }
//
//  public Optional<CityEntity> findById(Long id) {
//    return repository.findById(id);
//  }
//
//  public List<CityEntity> findByCountryId(Long countryId) {
//    return repository.findByCountryId(countryId);
//  }
//
//  @Transactional
//  public CityEntity create(Long countryId, String name) {
//    return repository.save(new CityEntity(null, countryId, name));
//  }
//
//  @Transactional
//  public Optional<CityEntity> update(Long id, Long countryId, String name) {
//    return repository.findById(id).map(existing -> {
//      existing.setCountryId(countryId);
//      existing.setName(name);
//      return repository.save(existing);
//    });
//  }
//
//  @Transactional
//  public boolean delete(Long id) {
//    if (!repository.existsById(id)) {
//      return false;
//    }
//    repository.deleteById(id);
//    return true;
//  }
//}
