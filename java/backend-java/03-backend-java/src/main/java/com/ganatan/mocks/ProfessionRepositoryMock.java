package com.ganatan.mocks;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.ganatan.modules.profession.Profession;

public class ProfessionRepositoryMock {

    private final List<Profession> items = new ArrayList<>();
    private int nextId = 1;

    public ProfessionRepositoryMock() {
        add("Actor");
        add("Actress");
        add("Animator");
        add("Art Director");
        add("Associate Producer");
        add("Cinematographer");
        add("Composer");
        add("Costume Designer");
        add("Editor");
        add("Executive Producer");
    }

    private void add(String name) {
        items.add(new Profession(nextId++, name + " Backend Mock"));
    }

    public Map<String, Object> getItems(int offset, int limit) {
        int totalItems = items.size();
        int totalPages = (int) Math.ceil((double) totalItems / limit);
        int currentPage = (offset / limit) + 1;
        int fromIndex = Math.min(offset, totalItems);
        int toIndex = Math.min(offset + limit, totalItems);
        List<Profession> paginatedItems = items.subList(fromIndex, toIndex);

        Map<String, Object> pagination = new HashMap<>();
        pagination.put("currentPage", currentPage);
        pagination.put("perPage", limit);
        pagination.put("totalItems", totalItems);
        pagination.put("totalPages", totalPages);

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("pagination", pagination);

        Map<String, Object> response = new HashMap<>();
        response.put("metadata", metadata);
        response.put("data", paginatedItems);

        return response;
    }

    public Optional<Profession> getItemById(int id) {
        return items.stream().filter(item -> item.getId() == id).findFirst();
    }

    public Profession createItem(Profession profession) {
        Profession newItem = new Profession(nextId++, profession.getName());
        items.add(newItem);
        return newItem;
    }

    public Optional<Profession> updateItem(int id, Profession updatedData) {
        Optional<Profession> existing = getItemById(id);
        existing.ifPresent(item -> item.setName(updatedData.getName()));
        return existing;
    }

    public boolean deleteItem(int id) {
        return items.removeIf(item -> item.getId() == id);
    }

    public boolean existsByName(String name) {
        return items.stream().anyMatch(item -> item.getName().equalsIgnoreCase(name));
    }
}
