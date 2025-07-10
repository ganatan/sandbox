import PersonService from '../person-service.js';

describe('PersonService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getItems: jest.fn().mockResolvedValue([
        { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
        { id: 2, name: 'Martin Scorsese', city: 'New York' },
      ]),
      getItemById: jest.fn(),
      createItem: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
    };

    service = new PersonService(mockRepository);
  });

  // Arrange - Act - Assert
  test('getItems should return all persons', async () => {
    // Arrange
    // Act
    const items = await service.getItems();
    // Assert
    expect(items).toHaveLength(2);
    expect(mockRepository.getItems).toHaveBeenCalledTimes(1);
  });

  test('getItemById should return a person by ID', async () => {
    // Arrange
    mockRepository.getItemById.mockResolvedValue({ id: 1, name: 'Steven Spielberg', city: 'Cincinnati' });
    // Act
    const person = await service.getItemById(1);
    // Assert
    expect(person).toEqual({ id: 1, name: 'Steven Spielberg', city: 'Cincinnati' });
    expect(mockRepository.getItemById).toHaveBeenCalledWith(1);
  });

  test('getItemById should return null if person is not found', async () => {
    // Arrange
    mockRepository.getItemById.mockResolvedValue(null);
    // Act
    const person = await service.getItemById(999);
    // Assert
    expect(person).toBeNull();
    expect(mockRepository.getItemById).toHaveBeenCalledWith(999);
  });

  test('createItem should add a new person', async () => {
    // Arrange
    const newPerson = { name: 'New Director', city: 'Los Angeles' };
    mockRepository.createItem.mockResolvedValue({ id: 3, ...newPerson });
    // Act
    const createdPerson = await service.createItem(newPerson);
    // Assert
    expect(createdPerson).toMatchObject({ id: 3, name: 'New Director', city: 'Los Angeles' });
    expect(mockRepository.createItem).toHaveBeenCalledWith(newPerson);
  });

  test('updateItem should update an existing person', async () => {
    // Arrange
    const updatedData = { name: 'Updated Name' };
    mockRepository.updateItem.mockResolvedValue({ id: 1, ...updatedData, city: 'Cincinnati' });
    // Act
    const updatedPerson = await service.updateItem(1, updatedData);
    // Assert
    expect(updatedPerson).toMatchObject({ id: 1, name: 'Updated Name', city: 'Cincinnati' });
    expect(mockRepository.updateItem).toHaveBeenCalledWith(1, updatedData);
  });

  test('updateItem should return null if person not found', async () => {
    // Arrange
    mockRepository.updateItem.mockResolvedValue(null);
    // Act
    const result = await service.updateItem(999, { name: 'Updated Name' });
    // Assert
    expect(result).toBeNull();
    expect(mockRepository.updateItem).toHaveBeenCalledWith(999, { name: 'Updated Name' });
  });

  test('deleteItem should remove a person and return it', async () => {
    // Arrange
    mockRepository.deleteItem.mockResolvedValue({ id: 1, name: 'Steven Spielberg' });
    // Act
    const deletedPerson = await service.deleteItem(1);
    // Assert
    expect(deletedPerson).toMatchObject({ id: 1, name: 'Steven Spielberg' });
    expect(mockRepository.deleteItem).toHaveBeenCalledWith(1);
  });

  test('deleteItem should return null if person not found', async () => {
    // Arrange
    mockRepository.deleteItem.mockResolvedValue(null);
    // Act
    const result = await service.deleteItem(999);
    // Assert
    expect(result).toBeNull();
    expect(mockRepository.deleteItem).toHaveBeenCalledWith(999);
  });
});
