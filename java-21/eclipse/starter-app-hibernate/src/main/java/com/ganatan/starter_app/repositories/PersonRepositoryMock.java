package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@ConditionalOnProperty(name = "db.client", havingValue = "mock")
public class PersonRepositoryMock implements PersonRepository {

    private final List<Person> persons = PersonMockData.getItems();

    @Override
    public List<Person> findAll() {
        return persons;
    }
}

