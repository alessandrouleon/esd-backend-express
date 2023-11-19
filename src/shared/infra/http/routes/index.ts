import { linesRoutes } from '@modules/lines/infra/http/routes/lines.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/lines', linesRoutes);

export { routes };
