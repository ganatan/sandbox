import express from 'express';

const app = express();
const port = 3000;

const directors = [
  { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
  { id: 2, name: 'Quentin Tarantino', city: 'Knoxville' },
  { id: 3, name: 'Martin Scorsese', city: 'New York' },
  { id: 4, name: 'Christopher Nolan', city: 'London' },
  { id: 5, name: 'James Cameron', city: 'Kapuskasing' },
  { id: 6, name: 'Tim Burton', city: 'Burbank' },
  { id: 7, name: 'Francis Ford Coppola', city: 'Detroit' },
  { id: 8, name: 'Wes Anderson', city: 'Houston' },
  { id: 9, name: 'David Fincher', city: 'Denver' },
  { id: 10, name: 'Paul Thomas Anderson', city: 'Los Angeles' },
  { id: 11, name: 'Ridley Scott', city: 'South Shields' },
  { id: 12, name: 'Stanley Kubrick', city: 'New York' }
];

app.get('/persons', (req, res) => {
  res.json(directors);
});

app.get('*', (req, res) => {
  res.json({ aaaa: 1111111 });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
