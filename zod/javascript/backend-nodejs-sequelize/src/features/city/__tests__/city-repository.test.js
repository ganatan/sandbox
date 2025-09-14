import CityRepository from '../city-repository.js';
import City from '../city-model.js';

jest.mock('../city-model.js');

describe('CityRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new CityRepository();
  });

  test('getItems should return all cities', async () => {
    const mockCities = [{ id: 1, name: 'Cincinnati' }, { id: 2, name: 'New York' }];
    City.findAll.mockResolvedValue(mockCities);

    const items = await repository.getItems();

    expect(City.findAll).toHaveBeenCalledWith({ attributes: ['id', 'name'] });
    expect(items).toEqual(mockCities);
  });

  test('getItemById should return a city by ID', async () => {
    const mockCity = { id: 1, name: 'Cincinnati' };
    City.findByPk.mockResolvedValue(mockCity);

    const city = await repository.getItemById(1);

    expect(City.findByPk).toHaveBeenCalledWith(1, { attributes: ['id', 'name'] });
    expect(city).toEqual(mockCity);
  });

  test('getItemById should return null if city is not found', async () => {
    City.findByPk.mockResolvedValue(null);

    const city = await repository.getItemById(999);

    expect(City.findByPk).toHaveBeenCalledWith(999, { attributes: ['id', 'name'] });
    expect(city).toBeNull();
  });

  test('createItem should add a new city', async () => {
    const newCity = { name: 'Los Angeles' };
    const createdCity = { id: 13, name: 'Los Angeles' };
    City.create.mockResolvedValue(createdCity);

    const result = await repository.createItem(newCity);

    expect(City.create).toHaveBeenCalledWith(newCity);
    expect(result).toEqual(createdCity);
  });

  test('updateItem should update an existing city', async () => {
    const updatedData = { name: 'Updated City' };
    const mockCity = { id: 1, name: 'Cincinnati', update: jest.fn().mockResolvedValue({ id: 1, ...updatedData }) };

    City.findByPk.mockResolvedValue(mockCity);

    const updatedCity = await repository.updateItem(1, updatedData);

    expect(City.findByPk).toHaveBeenCalledWith(1);
    expect(mockCity.update).toHaveBeenCalledWith(updatedData);
    expect(updatedCity).toEqual({ id: 1, name: 'Updated City' });
  });

  test('updateItem should return null if city is not found', async () => {
    City.findByPk.mockResolvedValue(null);

    const result = await repository.updateItem(999, { name: 'Updated City' });

    expect(City.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  test('deleteItem should remove a city and return it', async () => {
    const mockCity = { id: 1, name: 'Cincinnati', destroy: jest.fn().mockResolvedValue() };

    City.findByPk.mockResolvedValue(mockCity);

    const deletedCity = await repository.deleteItem(1);

    expect(City.findByPk).toHaveBeenCalledWith(1);
    expect(mockCity.destroy).toHaveBeenCalled();
    expect(deletedCity).toEqual(mockCity);
  });

  test('deleteItem should return null if city is not found', async () => {
    City.findByPk.mockResolvedValue(null);

    const result = await repository.deleteItem(999);

    expect(City.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});
