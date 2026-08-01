export declare class CreateCardDto {
    text: string;
    author?: string;
    columnId: string;
    boardId: string;
}
export declare class UpdateCardDto {
    text?: string;
    columnId?: string;
    position?: number;
}
