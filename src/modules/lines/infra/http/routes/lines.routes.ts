import { Router } from 'express';
import { LinesController } from '../controllers/LinesController';

const linesRoutes = Router();

const linesController = new LinesController();

linesRoutes.post('/', linesController.create);
linesRoutes.get('/', linesController.index);
linesRoutes.get('/search', linesController.search);
linesRoutes.patch('/:id', linesController.update);
linesRoutes.delete('/:id', linesController.delete);

export { linesRoutes };
