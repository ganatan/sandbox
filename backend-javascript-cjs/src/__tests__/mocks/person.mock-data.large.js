'use strict';

const base = [
  { id: 1, name: 'Christopher Nolan' },
  { id: 2, name: 'Quentin Tarantino' },
  { id: 3, name: 'Steven Spielberg' },
  { id: 4, name: 'Martin Scorsese' },
  { id: 5, name: 'James Cameron' },
  { id: 6, name: 'Ridley Scott' },
  { id: 7, name: 'Denis Villeneuve' },
];

module.exports = Array.from({ length: 1000 }, (unused, index) => ({
  id: index + 1,
  name: base[index % base.length].name + ' '.repeat(100),
}));
