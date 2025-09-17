import PersonRepository from '../person-repository.js';
import Person from '../person-model.js';

jest.mock('../person-model.js');

describe('PersonRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new PersonRepository();
  });

  test('getItems should return all persons', async () => {
    const mockPersons = [{ id: 1, name: 'Steven Spielberg' }, { id: 2, name: 'Martin Scorsese' }];
    Person.findAll.mockResolvedValue(mockPersons);

    const items = await repository.getItems();

    expect(Person.findAll).toHaveBeenCalledWith({ attributes: ['id', 'name'] });
    expect(items).toEqual(mockPersons);
  });

  test('getItemById should return a person by ID', async () => {
    const mockPerson = { id: 1, name: 'Steven Spielberg' };
    Person.findByPk.mockResolvedValue(mockPerson);

    const person = await repository.getItemById(1);

    expect(Person.findByPk).toHaveBeenCalledWith(1, { attributes: ['id', 'name'] });
    expect(person).toEqual(mockPerson);
  });

  test('getItemById should return null if person is not found', async () => {
    Person.findByPk.mockResolvedValue(null);

    const person = await repository.getItemById(999);

    expect(Person.findByPk).toHaveBeenCalledWith(999, { attributes: ['id', 'name'] });
    expect(person).toBeNull();
  });

  test('createItem should add a new person', async () => {
    const newPerson = { name: 'New Director' };
    const createdPerson = { id: 13, name: 'New Director' };
    Person.create.mockResolvedValue(createdPerson);

    const result = await repository.createItem(newPerson);

    expect(Person.create).toHaveBeenCalledWith(newPerson);
    expect(result).toEqual(createdPerson);
  });

  test('updateItem should update an existing person', async () => {
    const updatedData = { name: 'Updated Name' };
    const mockPerson = { id: 1, name: 'Steven Spielberg', update: jest.fn().mockResolvedValue({ id: 1, ...updatedData }) };

    Person.findByPk.mockResolvedValue(mockPerson);

    const updatedPerson = await repository.updateItem(1, updatedData);

    expect(Person.findByPk).toHaveBeenCalledWith(1);
    expect(mockPerson.update).toHaveBeenCalledWith(updatedData);
    expect(updatedPerson).toEqual({ id: 1, name: 'Updated Name' });
  });

  test('updateItem should return null if person not found', async () => {
    Person.findByPk.mockResolvedValue(null);

    const result = await repository.updateItem(999, { name: 'Updated Name' });

    expect(Person.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  test('deleteItem should remove a person and return it', async () => {
    const mockPerson = { id: 1, name: 'Steven Spielberg', destroy: jest.fn().mockResolvedValue() };

    Person.findByPk.mockResolvedValue(mockPerson);

    const deletedPerson = await repository.deleteItem(1);

    expect(Person.findByPk).toHaveBeenCalledWith(1);
    expect(mockPerson.destroy).toHaveBeenCalled();
    expect(deletedPerson).toEqual(mockPerson);
  });

  test('deleteItem should return null if person not found', async () => {
    Person.findByPk.mockResolvedValue(null);

    const result = await repository.deleteItem(999);

    expect(Person.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});
