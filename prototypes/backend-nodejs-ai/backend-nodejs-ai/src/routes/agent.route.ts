import { Router } from 'express';
import { generateCRUDHandler } from '../controllers/agent.controller';

const router = Router();

router.get('/generate-crud', generateCRUDHandler);

export default router;
