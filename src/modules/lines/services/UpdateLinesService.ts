import { inject, injectable } from 'tsyringe';
import { ILinesRepository } from '../repositories/ILinesRepository';
import { ILinesDTO } from '../dtos/ILinesDTO';
import AppError from '@shared/error/AppError';
import { LinesInformationMessage } from 'utils/MessageEnvironmentVariable';

@injectable()
export class UpdateLinesService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILinesRepository,
  ) {}
  public async execute({ id, ...rest }: ILinesDTO) {
    const line = await this.linesRepository.findByLinesId(Number(id));

    if (!line) {
      throw new AppError(LinesInformationMessage.LINE_ALREADY_EXISTS, 404);
    }
    const { code, description } = rest;
    if (!code.trim().length || !description.trim().length) {
      throw new AppError(LinesInformationMessage.LINE_WITH_EMPT_FIELD, 400);
    }

    Object.assign(line, {
      ...rest,
    });

    return await this.linesRepository.update(line);
  }
}
