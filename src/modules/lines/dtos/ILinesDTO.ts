import { Lines } from '../infra/typeorm/entities/Lines';

interface ILinesDTO {
  id?: number;
  code: string;
  description: string;
}

interface ILinesPaginationDTO {
  lines: Lines[];
  totalLines: number;
  totalPages: number;
}

export { ILinesDTO, ILinesPaginationDTO };
