package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;
import java.util.List;

public interface PersonRepositoryInterface {
    
    List<Person> findAll();
    
}