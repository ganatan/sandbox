import CityController from '../city-controller.js';

describe('CityController', () => {
  let controller;
  let mockService;
  let req, res, next;

  beforeEach(() => {
    mockService = {
      getItems: jest.fn(),
      getItemById: jest.fn(),
      createItem: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
    };
    controller = new CityController(mockService);

    req = { params: { id: '1' }, body: { name: 'New City' }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('getItems should return all cities', async () => {
    // Arrange
    mockService.getItems.mockResolvedValue([{ id: 1, name: 'Cincinnati' }]);

    // Act
    await controller.getItems(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Cincinnati' }]);
  });

  test('getItemById should return a city by ID', async () => {
    // Arrange
    mockService.getItemById.mockResolvedValue({ id: 1, name: 'Cincinnati' });

    // Act
    await controller.getItemById(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Cincinnati' });
  });

  test('createItem should add a new city', async () => {
    // Arrange
    mockService.createItem.mockResolvedValue({ id: 13, name: 'Los Angeles' });

    // Act
    await controller.createItem(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 13, name: 'Los Angeles' });
  });
});
