import PersonRepository from '../person-repository.js';

describe('PersonRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new PersonRepository();
  });

  // Arrange - Act - Assert
  test('getItems should return all persons', async () => {
    // Arrange
    // Act
    const items = await repository.getItems();
    // Assert
    expect(Array.isArray(items)).toBe(true);
    expect(items).toHaveLength(12);
  });

  test('getItemById should return a person by ID', async () => {
    // Arrange
    // Act
    const person = await repository.getItemById(1);
    // Assert
    expect(person).toEqual({ id: 1, name: 'Steven Spielberg', city: 'Cincinnati' });
  });

  test('getItemById should return null if person is not found', async () => {
    // Arrange
    // Act
    const person = await repository.getItemById(999);
    // Assert
    expect(person).toBeNull();
  });

  test('createItem should add a new person', async () => {
    // Arrange
    const newPerson = { name: 'New Director', city: 'Los Angeles' };
    // Act
    const createdPerson = await repository.createItem(newPerson);
    // Assert
    expect(createdPerson).toMatchObject({ id: 13, name: 'New Director', city: 'Los Angeles' });

    const allPersons = await repository.getItems();
    expect(allPersons).toHaveLength(13);
  });

  test('updateItem should update an existing person', async () => {
    // Arrange
    const updatedData = { name: 'Updated Name' };
    // Act
    const updatedPerson = await repository.updateItem(1, updatedData);
    // Assert
    expect(updatedPerson).toMatchObject({ id: 1, name: 'Updated Name', city: 'Cincinnati' });

    const person = await repository.getItemById(1);
    expect(person.name).toBe('Updated Name');
  });

  test('updateItem should return null if person not found', async () => {
    // Arrange
    // Act
    const result = await repository.updateItem(999, { name: 'Updated Name' });
    // Assert
    expect(result).toBeNull();
  });

  test('deleteItem should remove a person and return it', async () => {
    // Arrange
    // Act
    const deletedPerson = await repository.deleteItem(1);
    // Assert
    expect(deletedPerson).toMatchObject({ id: 1, name: 'Steven Spielberg' });

    const allPersons = await repository.getItems();
    expect(allPersons).toHaveLength(11);

    const person = await repository.getItemById(1);
    expect(person).toBeNull();
  });

  test('deleteItem should return null if person not found', async () => {
    // Arrange
    // Act
    const result = await repository.deleteItem(999);
    // Assert
    expect(result).toBeNull();
  });
});
