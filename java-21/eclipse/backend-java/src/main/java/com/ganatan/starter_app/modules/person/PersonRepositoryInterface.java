package com.ganatan.starter_app.modules.person;

import java.util.List;
import java.util.Optional;

public interface PersonRepositoryInterface {

    List<Person> findAll();

    Optional<Person> findById(Long id);

    Person save(Person person);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByName(String name);

    default void logRepositoryUsed() {
        System.out.println("[ganatan] Repository actif : " + getClass().getSimpleName());
    }
}


//package com.ganatan.starter_app.modules.person;
//
//import java.util.List;
//
//public interface PersonRepositoryInterface {
//
//    List<Person> findAll();
//
//    default void logRepositoryUsed() {
//        System.out.println("[ganatan] Repository actif : " + this.getClass().getName());
//    }
//}