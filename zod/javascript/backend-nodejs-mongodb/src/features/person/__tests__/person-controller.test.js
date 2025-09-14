import PersonController from '../person-controller.js';

describe('PersonController', () => {
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

    controller = new PersonController(mockService);

    req = { params: {}, body: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  // Arrange - Act - Assert
  test('getItems should return all persons', async () => {
    // Arrange
    const mockPersons = [{ id: 1, name: 'Steven Spielberg' }];
    mockService.getItems.mockResolvedValue(mockPersons);
    // Act
    await controller.getItems(req, res, next);
    // Assert
    expect(mockService.getItems).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPersons);
  });

  test('getItemById should return a person if found', async () => {
    // Arrange
    req.params.id = '1';
    const mockPerson = { id: 1, name: 'Steven Spielberg' };
    mockService.getItemById.mockResolvedValue(mockPerson);
    // Act
    await controller.getItemById(req, res, next);
    // Assert
    expect(mockService.getItemById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPerson);
  });

  test('getItemById should return 404 if person is not found', async () => {
    // Arrange
    req.params.id = '999';
    mockService.getItemById.mockResolvedValue(null);
    // Act
    await controller.getItemById(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith({ status: 404, message: 'Person not found' });
  });

  test('createItem should create a new person', async () => {
    // Arrange
    req.body = { name: 'New Director' };
    const mockPerson = { id: 2, name: 'New Director' };
    mockService.createItem.mockResolvedValue(mockPerson);
    // Act
    await controller.createItem(req, res, next);
    // Assert
    expect(mockService.createItem).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPerson);
  });

  test('updateItem should update an existing person', async () => {
    // Arrange
    req.params.id = '1';
    req.body = { name: 'Updated Name' };
    const mockPerson = { id: 1, name: 'Updated Name' };
    mockService.updateItem.mockResolvedValue(mockPerson);
    // Act
    await controller.updateItem(req, res, next);
    // Assert
    expect(mockService.updateItem).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPerson);
  });

  test('updateItem should return 404 if person is not found', async () => {
    // Arrange
    req.params.id = '999';
    req.body = { name: 'Updated Name' };
    mockService.updateItem.mockResolvedValue(null);
    // Act
    await controller.updateItem(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith({ status: 404, message: 'Person not found' });
  });

  test('deleteItem should remove a person', async () => {
    // Arrange
    req.params.id = '1';
    const mockPerson = { id: 1, name: 'Steven Spielberg' };
    mockService.deleteItem.mockResolvedValue(mockPerson);
    // Act
    await controller.deleteItem(req, res, next);
    // Assert
    expect(mockService.deleteItem).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPerson);
  });

  test('deleteItem should return 404 if person is not found', async () => {
    // Arrange
    req.params.id = '999';
    mockService.deleteItem.mockResolvedValue(null);
    // Act
    await controller.deleteItem(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith({ status: 404, message: 'Person not found' });
  });
});
