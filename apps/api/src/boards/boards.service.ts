import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepo: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnsRepo: Repository<ColumnEntity>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardsRepo.findOne({
      where: { id },
      relations: { columns: { cards: true } },
      order: {
        columns: { position: 'ASC' },
      },
    });
    if (!board) throw new NotFoundException(`Board ${id} not found`);
    return board;
  }

  async create(dto: CreateBoardDto): Promise<Board> {
    const board = this.boardsRepo.create(dto);
    const saved = await this.boardsRepo.save(board);

    const defaultColumns = [
      { name: '🌟 Went Well', position: 0, boardId: saved.id },
      { name: '🔧 To Improve', position: 1, boardId: saved.id },
      { name: '📋 Action Items', position: 2, boardId: saved.id },
      { name: '🎉 Kudos', position: 3, boardId: saved.id },
    ];

    const columns = this.columnsRepo.create(defaultColumns);
    await this.columnsRepo.save(columns);

    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardsRepo.findOneBy({ id });
    if (!board) throw new NotFoundException(`Board ${id} not found`);
    await this.boardsRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.boardsRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Board ${id} not found`);
  }
}
