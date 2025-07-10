package com.ganatan.modules.city;

import java.util.List;

import com.ganatan.mocks.CityRepositoryMock;

public class CityRepository {

    private final Object repository;

    public CityRepository(boolean useDatabase) {
        if (useDatabase) {
            this.repository = new CityRepositoryMock();
        } else {
            this.repository = new CityRepositoryMock();
        }
    }

    public List<City> getItems() {
        return ((CityRepositoryMock) repository).getItems();
    }
}

