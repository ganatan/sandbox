import express, { Request, Response } from 'express'

const app = express()
const port = 3000

const persons = [
  { id: 1, name: 'Steven Spielberg' },
  { id: 2, name: 'Christopher Nolan' },
  { id: 3, name: 'Quentin Tarantino' },
  { id: 4, name: 'Martin Scorsese' },
  { id: 5, name: 'Alfred Hitchcock' },
  { id: 6, name: 'Stanley Kubrick' },
  { id: 7, name: 'James Cameron' }
]

app.get('/persons', (req: Request, res: Response) => {
  res.json(persons)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
