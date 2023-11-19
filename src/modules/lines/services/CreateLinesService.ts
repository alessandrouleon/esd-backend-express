import { inject, injectable } from 'tsyringe';
import { ILinesRepository } from '../repositories/ILinesRepository';
import { ILinesDTO } from '../dtos/ILinesDTO';
import { Lines } from '../infra/typeorm/entities/Lines';
import AppError from '@shared/error/AppError';
import { LinesInformationMessage } from 'utils/MessageEnvironmentVariable';

@injectable()
export class CreateLinesService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILinesRepository,
  ) {}

  public async execute(data: ILinesDTO): Promise<Lines> {
    const existCode = await this.linesRepository.findByCode(data.code);

    if (!data.code.trim().length || !data.description.trim().length) {
      throw new AppError(LinesInformationMessage.LINE_WITH_EMPT_FIELD, 400);
    }

    if (existCode) {
      throw new AppError(LinesInformationMessage.LINE_ALREADY_EXISTS, 409);
    }

    return await this.linesRepository.create(data);
  }
}
