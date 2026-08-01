import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ default: 0 })
  votes!: number;

  @Column()
  columnId!: string;

  @Column()
  boardId!: string;

  @Column({ default: 0 })
  position!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Board, (board) => board.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column!: ColumnEntity;
}
