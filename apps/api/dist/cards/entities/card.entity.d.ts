import { Board } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';
export declare class Card {
    id: string;
    text: string;
    author?: string;
    votes: number;
    columnId: string;
    boardId: string;
    position: number;
    createdAt: Date;
    board: Board;
    column: ColumnEntity;
}
