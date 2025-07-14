package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@ConditionalOnProperty(name = "db.client", havingValue = "pg")
public interface PersonRepositoryPostgresql extends JpaRepository<Person, Long>, PersonRepository {
}


