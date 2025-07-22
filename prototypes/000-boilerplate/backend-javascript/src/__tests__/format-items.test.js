import formatPersons from '../format-items.js';

describe('formatPersons', () => {
  test('should add firstName and status to each person', () => {
    const input = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    const result = formatPersons(input);

    expect(result).toEqual([
      { id: 1, name: 'John Doe', firstName: 'John Doe', status: 'active' },
      { id: 2, name: 'Jane Smith', firstName: 'Jane Smith', status: 'active' },
    ]);
  });
});
