export interface Board {
  id: string;
  title: string;
  sprintName?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  columns?: ColumnEntity[];
  cards?: Card[];
}

export interface ColumnEntity {
  id: string;
  name: string;
  position: number;
  boardId: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  text: string;
  author?: string;
  votes: number;
  columnId: string;
  boardId: string;
  position: number;
  createdAt: string;
}

export interface CreateBoardDto {
  title: string;
  sprintName?: string;
  description?: string;
}

export interface CreateCardDto {
  text: string;
  author?: string;
  columnId: string;
  boardId: string;
}

export interface UpdateCardDto {
  text?: string;
  columnId?: string;
  position?: number;
}
