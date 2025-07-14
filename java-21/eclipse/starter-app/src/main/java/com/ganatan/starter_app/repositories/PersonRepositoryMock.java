package com.ganatan.starter_app.repositories;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ganatan.starter_app.entities.Person;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
@ConditionalOnProperty(name = "db.client", havingValue = "mock")
public class PersonRepositoryMock implements PersonRepositoryInterface {

    private List<Person> persons = new ArrayList<>();

    @PostConstruct
    public void loadData() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ClassPathResource resource = new ClassPathResource("data/mock/persons.json");
            persons = mapper.readValue(resource.getInputStream(), new TypeReference<List<Person>>() {});
            System.out.println("📁 [GANATAN MOCK] JSON chargé : " + persons.size() + " personnes.");
        } catch (IOException e) {
            System.err.println("❌ [GANATAN MOCK] Erreur JSON : " + e.getMessage());
            persons.clear();
        }
    }

    @Override
    public List<Person> findAll() {
        return persons;
    }
}
