import { Card } from '../../cards/entities/card.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';
export declare class Board {
    id: string;
    title: string;
    sprintName?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    columns: ColumnEntity[];
    cards: Card[];
}
