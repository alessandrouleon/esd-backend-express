import { ILinesDTO, ILinesPaginationDTO } from '../dtos/ILinesDTO';
import { Lines } from '../infra/typeorm/entities/Lines';

export interface ILinesRepository {
  findByLinesId(id: number): Promise<Lines | undefined>;
  findByCode(code: string): Promise<Lines | undefined>;
  findByUnifiedValueSearch(
    unifiedValue: string,
  ): Promise<(Lines | undefined)[] | undefined>;
  findAllPaginatedLines(page: number): Promise<ILinesPaginationDTO>;
  create(data: ILinesDTO): Promise<Lines>;
  update(data: Lines): Promise<Lines>;
  delete(id: number): Promise<void>;
}
