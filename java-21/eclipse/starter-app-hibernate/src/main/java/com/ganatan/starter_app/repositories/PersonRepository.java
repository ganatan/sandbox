package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;
import java.util.List;

public interface PersonRepository {
    List<Person> findAll();
}
