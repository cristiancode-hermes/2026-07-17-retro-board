import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    findAll(): Promise<Board[]>;
    findOne(id: string): Promise<Board>;
    create(dto: CreateBoardDto): Promise<Board>;
    update(id: string, dto: UpdateBoardDto): Promise<Board>;
    remove(id: string): Promise<void>;
}
