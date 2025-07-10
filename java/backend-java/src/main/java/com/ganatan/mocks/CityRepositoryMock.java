package com.ganatan.mocks;

import java.util.List;

import com.ganatan.modules.city.City;

import java.util.Arrays;

public class CityRepositoryMock {
	public List<City> getItems() {
		return Arrays.asList(
				new City(1, "Cincinnati"),
                new City(1, "London"),
                new City(1, "South Shields"),
                new City(1, "Bécancour")
        );
    }
}
