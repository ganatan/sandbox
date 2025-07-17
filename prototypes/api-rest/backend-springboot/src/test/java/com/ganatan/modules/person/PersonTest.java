package com.ganatan.modules.person;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PersonTest {

    @Test
    void shouldCreatePersonWithCorrectValues() {
        Person person = new Person(1L, "John Doe");

        assertEquals(1L, person.getId());
        assertEquals("John Doe", person.getName());
    }
}
