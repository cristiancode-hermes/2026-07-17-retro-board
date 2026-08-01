import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';
export declare class ColumnEntity {
    id: string;
    name: string;
    position: number;
    boardId: string;
    board: Board;
    cards: Card[];
}
