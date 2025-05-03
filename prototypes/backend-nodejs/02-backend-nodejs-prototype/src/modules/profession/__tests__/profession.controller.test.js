import Controller from '../item.controller.js';

describe('ProfessionController', () => {
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

    controller = new Controller(mockService);

    req = { params: {}, body: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  // Arrange - Act - Assert
  test('getItems should return all professions', async () => {
    // Arrange
    const mockProfessions = [{ id: 1, name: 'Director' }];
    mockService.getItems.mockResolvedValue(mockProfessions);
    // Act
    await controller.getItems(req, res, next);
    // Assert
    expect(mockService.getItems).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProfessions);
  });

  test('createItem should create a new profession', async () => {
    // Arrange
    req.body = { name: 'New Director' };
    const mockProfession = { id: 2, name: 'New Director' };
    mockService.createItem.mockResolvedValue(mockProfession);
    // Act
    await controller.createItem(req, res, next);
    // Assert
    expect(mockService.createItem).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProfession);
  });

  test('updateItem should update an existing profession', async () => {
    // Arrange
    req.params.id = '1';
    req.body = { name: 'Updated Name' };
    const mockProfession = { id: 1, name: 'Updated Name' };
    mockService.updateItem.mockResolvedValue(mockProfession);
    // Act
    await controller.updateItem(req, res, next);
    // Assert
    expect(mockService.updateItem).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProfession);
  });

  test('deleteItem should remove a profession', async () => {
    // Arrange
    req.params.id = '1';
    const mockProfession = { id: 1, name: 'Director' };
    mockService.deleteItem.mockResolvedValue(mockProfession);
    // Act
    await controller.deleteItem(req, res, next);
    // Assert
    expect(mockService.deleteItem).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProfession);
  });

});
