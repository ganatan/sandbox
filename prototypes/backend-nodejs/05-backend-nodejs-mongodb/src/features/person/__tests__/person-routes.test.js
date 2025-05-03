import request from 'supertest';
import express from 'express';
import responseHandler from '../../../middleware/response-handler.js';

describe('Person Routes', () => {
  let app;
  let mockController;

  beforeEach(() => {
    mockController = {
      getItems: jest.fn((req, res, next) => next()),
      getItemById: jest.fn((req, res, next) => next()),
      createItem: jest.fn((req, res, next) => next()),
      updateItem: jest.fn((req, res, next) => next()),
      deleteItem: jest.fn((req, res, next) => next()),
    };

    app = express();
    app.use(express.json());

    const router = express.Router();
    router.get('/', mockController.getItems, responseHandler);
    router.get('/:id', mockController.getItemById, responseHandler);
    router.post('/', mockController.createItem, responseHandler);
    router.put('/:id', mockController.updateItem, responseHandler);
    router.delete('/:id', mockController.deleteItem, responseHandler);

    app.use('/persons', router);
  });

  // Arrange - Act - Assert
  test('GET /persons should call getItems', async () => {
    // Act
    await request(app).get('/persons');
    // Assert
    expect(mockController.getItems).toHaveBeenCalled();
  });

  test('GET /persons/:id should call getItemById', async () => {
    // Act
    await request(app).get('/persons/1');
    // Assert
    expect(mockController.getItemById).toHaveBeenCalled();
  });

  test('POST /persons should call createItem', async () => {
    // Arrange
    const newPerson = { name: 'New Director' };
    // Act
    await request(app).post('/persons').send(newPerson);
    // Assert
    expect(mockController.createItem).toHaveBeenCalled();
  });

  test('PUT /persons/:id should call updateItem', async () => {
    // Arrange
    const updatedData = { name: 'Updated Name' };
    // Act
    await request(app).put('/persons/1').send(updatedData);
    // Assert
    expect(mockController.updateItem).toHaveBeenCalled();
  });

  test('DELETE /persons/:id should call deleteItem', async () => {
    // Act
    await request(app).delete('/persons/1');
    // Assert
    expect(mockController.deleteItem).toHaveBeenCalled();
  });
});
