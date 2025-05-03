import { writeFile } from './file-writer';

export async function generateCRUD(entity: string, properties: string[]) {
  console.log('00000000001');
  const className = entity.charAt(0).toUpperCase() + entity.slice(1);
  const content = `
// MOCK CRUD for ${entity}
import express from 'express';
const router = express.Router();

let ${entity}s: any[] = [];

router.get('/', (req, res) => {
  res.json(${entity}s);
});

router.get('/:id', (req, res) => {
  const item = ${entity}s.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).send();
});

router.post('/', (req, res) => {
  const newItem = req.body;
  ${entity}s.push(newItem);
  res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
  const index = ${entity}s.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    ${entity}s[index] = req.body;
    res.json(${entity}s[index]);
  } else {
    res.status(404).send();
  }
});

router.delete('/:id', (req, res) => {
  const index = ${entity}s.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    ${entity}s.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

export default router;
  `.trim();

  const filename = `${entity}.ts`;
  await writeFile(filename, content);
}
