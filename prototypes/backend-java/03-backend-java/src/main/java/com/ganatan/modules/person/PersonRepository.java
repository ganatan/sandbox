package com.ganatan.modules.person;

import java.util.List;

import com.ganatan.mocks.PersonRepositoryMock;
import com.ganatan.mocks.ProfessionRepositoryMock;
import com.ganatan.modules.profession.ProfessionRepositoryPg;

public class PersonRepository {

    private final Object repository;

	public PersonRepository(String useDbClient) {
		switch (useDbClient.toLowerCase()) {
		case "mock":
			this.repository = new PersonRepositoryMock();
			break;
		case "pg":
			this.repository = new PersonRepositoryMock();
			break;
		case "mysql":
			this.repository = new PersonRepositoryMock();
			break;
		default:
			this.repository = new PersonRepositoryMock();
			break;
		}
	}

    public List<Person> getItems() {
        return ((PersonRepositoryMock) repository).getItems();
    }
}

