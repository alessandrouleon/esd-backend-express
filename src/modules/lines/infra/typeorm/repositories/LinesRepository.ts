import { ILinesPaginationDTO, ILinesDTO } from '@modules/lines/dtos/ILinesDTO';
import { ILinesRepository } from '@modules/lines/repositories/ILinesRepository';
import { Lines } from '../entities/Lines';
import { Like, Repository, getRepository } from 'typeorm';

const TOTAL_PER_PAGE = 11;

export class LinesRepository implements ILinesRepository {
  private ormRepository: Repository<Lines>;

  constructor() {
    this.ormRepository = getRepository(Lines);
  }

  public async findByLinesId(id: number): Promise<Lines | undefined> {
    return await this.ormRepository.findOne({ id });
  }

  public async findByCode(code: string): Promise<Lines | undefined> {
    return await this.ormRepository.findOne({
      where: { code },
      withDeleted: false,
    });
  }

  public async findByUnifiedValueSearch(
    unifiedValue: string,
  ): Promise<(Lines | undefined)[] | undefined> {
    const lines = await this.ormRepository.find({
      where: [
        { description: Like(`${unifiedValue}%`) },
        { code: Like(`${unifiedValue}%`) },
      ],
      take: TOTAL_PER_PAGE,
      order: { created_at: 'DESC' },
    });
    return lines;
  }

  public async findAllPaginatedLines(page = 1): Promise<ILinesPaginationDTO> {
    const lines = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });
    const totalLines = (await this.ormRepository.find()).length;

    return {
      lines,
      totalLines,
      totalPages: totalLines / TOTAL_PER_PAGE,
    };
  }

  public async create(data: ILinesDTO): Promise<Lines> {
    return await this.ormRepository.save(data);
  }

  public async update(data: Lines): Promise<Lines> {
    return await this.ormRepository.save(data);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
