import { LinesRepository } from '@modules/lines/infra/typeorm/repositories/LinesRepository';
import { ILinesRepository } from '@modules/lines/repositories/ILinesRepository';
import { container } from 'tsyringe';

container.registerSingleton<ILinesRepository>(
  'LinesRepository',
  LinesRepository,
);
