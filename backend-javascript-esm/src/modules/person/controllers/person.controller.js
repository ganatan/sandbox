import persons from '../mocks/person.mock-data.js';

export default function getItems(req, res) {
  const result = {
    success: true,
    data: persons,
  };

  res.json(result);
}
