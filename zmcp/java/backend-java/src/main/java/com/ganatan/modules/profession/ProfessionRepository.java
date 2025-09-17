package com.ganatan.modules.profession;

import java.util.Map;
import java.util.Optional;

import com.ganatan.mocks.ProfessionRepositoryMock;
import com.ganatan.modules.profession.ProfessionRepositoryPg;

public class ProfessionRepository {

	private final Object repository;

	public ProfessionRepository(String useDbClient) {
		switch (useDbClient.toLowerCase()) {
		case "mock":
			this.repository = new ProfessionRepositoryMock();
			break;
		case "pg":
			this.repository = new ProfessionRepositoryPg();
			break;
		case "mysql":
			this.repository = new ProfessionRepositoryMock();
			break;
		default:
			this.repository = new ProfessionRepositoryMock();
			break;
		}
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getItems(int offset, int limit) {
		System.out.println("00000000001:ProfessionRepository");
		if (repository instanceof ProfessionRepositoryPg pg) {
			System.out.println("00000000002:ProfessionRepository");
			return pg.getItems(offset, limit);
		}
		return ((ProfessionRepositoryMock) repository).getItems(offset, limit);
	}

	public Optional<Profession> getItemById(int id) {
		if (repository instanceof ProfessionRepositoryPg pg) {
			return pg.getItemById(id);
		}
		return ((ProfessionRepositoryMock) repository).getItemById(id);
	}

	public Profession createItem(Profession profession) {
		if (repository instanceof ProfessionRepositoryPg pg) {
			return pg.createItem(profession);
		}
		return ((ProfessionRepositoryMock) repository).createItem(profession);
	}

	public Optional<Profession> updateItem(int id, Profession updatedData) {
		if (repository instanceof ProfessionRepositoryPg pg) {
			return pg.updateItem(id, updatedData);
		}
		return ((ProfessionRepositoryMock) repository).updateItem(id, updatedData);
	}

	public boolean deleteItem(int id) {
		if (repository instanceof ProfessionRepositoryPg pg) {
			return pg.deleteItem(id);
		}
		return ((ProfessionRepositoryMock) repository).deleteItem(id);
	}

	public boolean existsByName(String name) {
		if (repository instanceof ProfessionRepositoryPg pg) {
			return pg.existsByName(name);
		}
		return ((ProfessionRepositoryMock) repository).existsByName(name);
	}
}
