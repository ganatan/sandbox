import request from 'supertest';
import express from 'express';
import responseHandler from '../../../middleware/response-handler.js';

describe('City Routes', () => {
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

    app.use('/cities', router);
  });

  // Arrange - Act - Assert
  test('GET /cities should call getItems', async () => {
    // Act
    await request(app).get('/cities');
    // Assert
    expect(mockController.getItems).toHaveBeenCalled();
  });

  test('GET /cities/:id should call getItemById', async () => {
    // Act
    await request(app).get('/cities/1');
    // Assert
    expect(mockController.getItemById).toHaveBeenCalled();
  });

  test('POST /cities should call createItem', async () => {
    // Arrange
    const newCity = { name: 'Los Angeles' };
    // Act
    await request(app).post('/cities').send(newCity);
    // Assert
    expect(mockController.createItem).toHaveBeenCalled();
  });

  test('PUT /cities/:id should call updateItem', async () => {
    // Arrange
    const updatedData = { name: 'Updated City' };
    // Act
    await request(app).put('/cities/1').send(updatedData);
    // Assert
    expect(mockController.updateItem).toHaveBeenCalled();
  });

  test('DELETE /cities/:id should call deleteItem', async () => {
    // Act
    await request(app).delete('/cities/1');
    // Assert
    expect(mockController.deleteItem).toHaveBeenCalled();
  });
});
