PersonRepositoryMock.java

package com.ganatan.modules.person;

import java.util.List;
import java.util.Arrays;

public class PersonRepositoryMock {
    public List<Person> getItems() {
        return Arrays.asList(
            new Person(100, "Mock Director 1", "Mock City 1"),
            new Person(101, "Mock Director 2", "Mock City 2")
        );
    }
}

PersonRepository.java
package com.ganatan.modules.person;

import java.util.List;

public class PersonRepository {

    private final Object repository;

    public PersonRepository(boolean useDatabase) {
        if (useDatabase) {
            this.repository = new PersonRepositoryMock();
        } else {
            this.repository = new PersonRepositoryMock();
        }
    }

    public List<Person> getItems() {
        return ((PersonRepositoryMock) repository).getItems();
    }
}

AppConfig.java
package com.ganatan.config;

import java.io.InputStream;
import java.util.Properties;

public class AppConfig {
    private static final Properties properties = new Properties();
    
    static {
        try (InputStream input = AppConfig.class.getClassLoader().getResourceAsStream("application.properties")) {
            properties.load(input);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load config", e);
        }
    }

    public static boolean useDatabase() {
        return Boolean.parseBoolean(properties.getProperty("use.database", "false"));
    }
}


Fichier
src/main/resources/application.properties
avec
use.database=true