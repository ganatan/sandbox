
package com.ganatan.modules.city;

import java.util.List;

public class CityService {

    private final CityRepository repository;

    public CityService(CityRepository  repository) {
        this.repository = repository;
    }

    public List<City> getItems() {
        return repository.getItems();
    }
}
