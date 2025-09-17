package com.ganatan.modules.profession;

import java.util.Map;
import java.util.Optional;

import com.ganatan.mocks.ProfessionRepositoryMock;

public class ProfessionRepository {

    private final ProfessionRepositoryMock repository;

    public ProfessionRepository(boolean useDatabase) {
        if (useDatabase) {
            this.repository = new ProfessionRepositoryMock();
        } else {
            this.repository = new ProfessionRepositoryMock();
        }
    }

    public Map<String, Object> getItems(int offset, int limit) {
        return repository.getItems(offset, limit);
    }

    public Optional<Profession> getItemById(int id) {
        return repository.getItemById(id);
    }

    public Profession createItem(Profession profession) {
        return repository.createItem(profession);
    }

    public Optional<Profession> updateItem(int id, Profession updatedData) {
        return repository.updateItem(id, updatedData);
    }

    public boolean deleteItem(int id) {
        return repository.deleteItem(id);
    }

    public boolean existsByName(String name) {
        return repository.existsByName(name);
    }
}
