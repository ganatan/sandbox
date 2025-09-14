package com.ganatan.modules.person;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class PersonServiceTest {

    private final PersonService service = new PersonService();

    @Test
    void shouldReturnAllPersons() {
        List<Person> persons = service.getItems();

        assertThat(persons).isNotNull();
        assertThat(persons).hasSize(2);
        assertThat(persons).extracting(Person::getName).contains("Steven Spielberg", "Martin Scorsese");
    }

    @Test
    void shouldReturnPersonById() {
        Person person = service.getItemById(1L);

        assertThat(person).isNotNull();
        assertThat(person.getId()).isEqualTo(1L);
        assertThat(person.getName()).isEqualTo("Steven Spielberg");
    }

    @Test
    void shouldCreatePerson() {
        Person newPerson = new Person(10L, "Ridley Scott");

        Person created = service.createItem(newPerson);

        assertThat(created).isNotNull();
        assertThat(created.getId()).isEqualTo(10L);
        assertThat(created.getName()).isEqualTo("Ridley Scott");

        assertThat(service.getItems()).hasSize(3);
    }

    @Test
    void shouldThrowWhenCreatingExistingPerson() {
        Person duplicate = new Person(1L, "Someone Else");

        assertThatThrownBy(() -> service.createItem(duplicate))
            .isInstanceOf(IllegalStateException.class)
            .hasMessage("ALREADY_EXISTS");
    }

    @Test
    void shouldUpdateExistingPerson() {
        Person updated = service.updateItem(1L, new Person(1L, "Updated Name"));

        assertThat(updated).isNotNull();
        assertThat(updated.getId()).isEqualTo(1L);
        assertThat(updated.getName()).isEqualTo("Updated Name");
    }

    @Test
    void shouldReturnNullWhenUpdatingNonExistingPerson() {
        Person updated = service.updateItem(999L, new Person(999L, "Ghost"));

        assertThat(updated).isNull();
    }

    @Test
    void shouldDeletePerson() {
        boolean deleted = service.deleteItem(1L);

        assertThat(deleted).isTrue();
        assertThat(service.getItemById(1L)).isNull();
    }

    @Test
    void shouldReturnFalseWhenDeletingNonExistingPerson() {
        boolean deleted = service.deleteItem(999L);

        assertThat(deleted).isFalse();
    }
}
