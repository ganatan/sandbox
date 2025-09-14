import { Request, Response } from 'express';
import { generateCRUD } from '../core/agent';

export async function generateCRUDHandler(req: Request, res: Response) {
  try {
    const { entity, properties } = req.body;
    await generateCRUD(entity, properties);
    res.status(200).json({ message: `${entity} CRUD generated.` });
  } catch (error) {
    res.status(500).json({ error: 'Error generating CRUD', details: error });
  }
}
