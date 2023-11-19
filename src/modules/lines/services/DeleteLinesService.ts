import { inject, injectable } from 'tsyringe';
import { ILinesRepository } from '../repositories/ILinesRepository';
import { Lines } from '../infra/typeorm/entities/Lines';
import AppError from '@shared/error/AppError';
import { LinesInformationMessage } from 'utils/MessageEnvironmentVariable';

@injectable()
export class DeleteLinesService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILinesRepository,
  ) {}

  public async execute(id: number): Promise<Lines> {
    const linesExistes = await this.linesRepository.findByLinesId(id);

    if (!linesExistes) {
      throw new AppError(
        LinesInformationMessage.LINE_DOES_NOT_EXISTS_EXCLUSION,
        404,
      );
    }
    await this.linesRepository.delete(id);
    return linesExistes;
  }
}
