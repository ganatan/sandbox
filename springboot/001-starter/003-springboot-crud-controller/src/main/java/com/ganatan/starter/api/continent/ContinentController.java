package com.ganatan.starter.api.continent;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
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
@RequestMapping("/continents")
public class ContinentController {

  private final AtomicInteger idCounter = new AtomicInteger(0);
  private final List<Continent> continentList = new ArrayList<>();

  public record Continent(int id, String name) {}

  public ContinentController() {
    createContinent(new Continent(0, "Africa"));
    createContinent(new Continent(0, "America"));
    createContinent(new Continent(0, "Asia"));
    createContinent(new Continent(0, "Europe"));
    createContinent(new Continent(0, "Oceania"));
    createContinent(new Continent(0, "Antarctica"));
  }

  @GetMapping
  public List<Continent> getAllContinents() {
    return continentList;
  }

  @GetMapping("/{id}")
  public Continent getContinentById(@PathVariable int id) {
    return findContinentById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Continent createContinent(@RequestBody Continent newContinent) {
    int newId = idCounter.incrementAndGet();
    Continent created = new Continent(newId, newContinent.name());
    continentList.add(created);
    return created;
  }

  @PutMapping("/{id}")
  public Continent updateContinent(@PathVariable int id, @RequestBody Continent modified) {
    Continent existing = findContinentById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    Continent updated = new Continent(existing.id(), modified.name());
    continentList.set(continentList.indexOf(existing), updated);
    return updated;
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteContinent(@PathVariable int id) {
    Continent existing = findContinentById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    continentList.remove(existing);
  }

  private Optional<Continent> findContinentById(int id) {
    return continentList.stream()
      .filter(c -> c.id() == id)
      .findFirst();
  }
}