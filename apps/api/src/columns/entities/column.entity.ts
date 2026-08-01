import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: 0 })
  position!: number;

  @Column()
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @OneToMany(() => Card, (card) => card.column)
  cards!: Card[];
}
