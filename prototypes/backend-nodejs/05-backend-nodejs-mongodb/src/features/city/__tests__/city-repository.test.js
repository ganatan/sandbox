import CityRepository from '../city-repository.js';

describe('CityRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new CityRepository(false);
  });

  test('getItems should return all cities', async () => {
    // Arrange
    const expectedLength = 3;

    // Act
    const items = await repository.getItems();

    // Assert
    expect(Array.isArray(items)).toBe(true);
    expect(items).toHaveLength(expectedLength);
  });

  test('getItemById should return a city by ID', async () => {
    // Arrange
    const expectedCity = { id: 1, name: 'New York' };

    // Act
    const city = await repository.getItemById(1);

    // Assert
    expect(city).toEqual(expectedCity);
  });

  test('getItemById should return null if city is not found', async () => {
    // Act
    const city = await repository.getItemById(999);

    // Assert
    expect(city).toBeNull();
  });

  test('createItem should add a new city', async () => {
    // Arrange
    const newCity = { name: 'San Francisco' };
    const expectedId = 4;

    // Act
    const createdCity = await repository.createItem(newCity);
    const allCities = await repository.getItems();

    // Assert
    expect(createdCity).toMatchObject({ id: expectedId, name: 'San Francisco' });
    expect(allCities).toHaveLength(4);
  });

  test('updateItem should modify an existing city', async () => {
    // Arrange
    const updatedData = { name: 'San Diego' };

    // Act
    const updatedCity = await repository.updateItem(1, updatedData);

    // Assert
    expect(updatedCity).toMatchObject({ id: 1, name: 'San Diego' });
  });

  test('updateItem should return null if city does not exist', async () => {
    // Act
    const updatedCity = await repository.updateItem(999, { name: 'Unknown' });

    // Assert
    expect(updatedCity).toBeNull();
  });

  test('deleteItem should remove a city and return it', async () => {
    // Arrange
    const expectedCity = { id: 1, name: 'New York' };

    // Act
    const deletedCity = await repository.deleteItem(1);
    const allCities = await repository.getItems();
    const city = await repository.getItemById(1);

    // Assert
    expect(deletedCity).toMatchObject(expectedCity);
    expect(allCities).toHaveLength(2);
    expect(city).toBeNull();
  });

  test('deleteItem should return null if city does not exist', async () => {
    // Act
    const deletedCity = await repository.deleteItem(999);

    // Assert
    expect(deletedCity).toBeNull();
  });
});
