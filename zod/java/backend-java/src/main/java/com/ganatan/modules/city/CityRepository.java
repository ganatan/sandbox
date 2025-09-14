package com.ganatan.modules.city;

import java.util.List;

import com.ganatan.mocks.CityRepositoryMock;
import com.ganatan.mocks.PersonRepositoryMock;

public class CityRepository {

	private final Object repository;

	public CityRepository(String useDbClient) {
		switch (useDbClient.toLowerCase()) {
		case "mock":
			this.repository = new CityRepositoryMock();
			break;
		case "pg":
			this.repository = new CityRepositoryMock();
			break;
		case "mysql":
			this.repository = new CityRepositoryMock();
			break;
		default:
			this.repository = new CityRepositoryMock();
			break;
		}
	}

	public List<City> getItems() {
		return ((CityRepositoryMock) repository).getItems();
	}
}
