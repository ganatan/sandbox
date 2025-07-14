// repositories/PersonRepositoryJpaMysql.java  
package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@ConditionalOnProperty(name = "db.client", havingValue = "mysql")
public interface PersonRepositoryJpaMysql extends JpaRepository<Person, Long>, PersonRepositoryInterface {
    // findAll() est hérité de JpaRepository
}