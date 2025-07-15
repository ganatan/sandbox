package com.ganatan.starter_app.modules.person;

import java.util.List;

public interface PersonRepositoryInterface {

    List<Person> findAll();

    default void logRepositoryUsed() {
        System.out.println("[ganatan] Repository actif : " + this.getClass().getName());
    }
}