import CityService from '../city-service.js';

describe('CityService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getItems: jest.fn(),
      getItemById: jest.fn(),
      createItem: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
    };
    service = new CityService(mockRepository);
  });

  test('getItems should return all cities', async () => {
    // Arrange
    mockRepository.getItems.mockResolvedValue([{ id: 1, name: 'Cincinnati' }]);

    // Act
    const items = await service.getItems();

    // Assert
    expect(items).toEqual([{ id: 1, name: 'Cincinnati' }]);
  });

  test('createItem should add a new city', async () => {
    // Arrange
    const newCity = { name: 'Los Angeles' };
    mockRepository.createItem.mockResolvedValue({ id: 13, ...newCity });

    // Act
    const createdCity = await service.createItem(newCity);

    // Assert
    expect(createdCity).toEqual({ id: 13, name: 'Los Angeles' });
  });
});
