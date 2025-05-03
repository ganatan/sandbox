import CityRepository from '../city-repository.js';

describe('CityRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new CityRepository();
  });

  test('getItems should return all cities', async () => {
    // Arrange
    const expectedLength = 12;

    // Act
    const items = await repository.getItems();

    // Assert
    expect(Array.isArray(items)).toBe(true);
    expect(items).toHaveLength(expectedLength);
  });

  test('getItemById should return a city by ID', async () => {
    // Arrange
    const expectedCity = { id: 1, name: 'Cincinnati' };

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
    const newCity = { name: 'Los Angeles' };

    // Act
    const createdCity = await repository.createItem(newCity);
    const allCities = await repository.getItems();

    // Assert
    expect(createdCity).toMatchObject({ id: 13, name: 'Los Angeles' });
    expect(allCities).toHaveLength(13);
  });

  test('deleteItem should remove a city and return it', async () => {
    // Arrange
    const expectedCity = { id: 1, name: 'Cincinnati' };

    // Act
    const deletedCity = await repository.deleteItem(1);
    const allCities = await repository.getItems();
    const city = await repository.getItemById(1);

    // Assert
    expect(deletedCity).toMatchObject(expectedCity);
    expect(allCities).toHaveLength(11);
    expect(city).toBeNull();
  });
});
