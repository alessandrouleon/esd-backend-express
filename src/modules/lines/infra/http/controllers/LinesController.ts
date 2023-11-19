import { ILinesDTO } from '@modules/lines/dtos/ILinesDTO';
import { CreateLinesService } from '@modules/lines/services/CreateLinesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LinesRepository } from '../../typeorm/repositories/LinesRepository';
import { UpdateLinesService } from '@modules/lines/services/UpdateLinesService';
import { DeleteLinesService } from '@modules/lines/services/DeleteLinesService';
import AppError from '@shared/error/AppError';
import { LinesInformationMessage } from 'utils/MessageEnvironmentVariable';

export class LinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ILinesDTO;

    const createLines = container.resolve(CreateLinesService);

    const line = await createLines.execute(data);
    return response.status(201).json(line);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const linesRepository = new LinesRepository();
    const { page } = request.query;
    const { lines, totalLines, totalPages } =
      await linesRepository.findAllPaginatedLines(Number(page));

    return response.json({
      lines,
      totalLines,
      totalPages,
    });
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { unifiedValue } = request.query;

    if (!String(unifiedValue).trim().length)
      throw new AppError(LinesInformationMessage.VALUE_DOES_NOT_EXISTS, 404);

    const linesRepository = new LinesRepository();
    const lines = await linesRepository.findByUnifiedValueSearch(
      String(unifiedValue),
    );

    if (!lines?.length)
      throw new AppError(LinesInformationMessage.VALUE_DOES_NOT_EXISTS, 404);

    return response.json(lines);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    const lineUpdate = container.resolve(UpdateLinesService);

    const line = await lineUpdate.execute({ id: Number(id), ...data });

    return response.status(201).json(line);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const lineDeleted = container.resolve(DeleteLinesService);

    await lineDeleted.execute(Number(id));
    return response.status(201).json();
  }
}
