const { createWindow } = require('./main')

test('createWindow est une fonction', () => {
  expect(typeof createWindow).toBe('function')
})
