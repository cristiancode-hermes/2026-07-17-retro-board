import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
export declare class BoardsService {
    private boardsRepo;
    private columnsRepo;
    constructor(boardsRepo: Repository<Board>, columnsRepo: Repository<ColumnEntity>);
    findAll(): Promise<Board[]>;
    findOne(id: string): Promise<Board>;
    create(dto: CreateBoardDto): Promise<Board>;
    update(id: string, dto: UpdateBoardDto): Promise<Board>;
    remove(id: string): Promise<void>;
}
