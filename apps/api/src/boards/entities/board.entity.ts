import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  sprintName?: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => ColumnEntity, (column) => column.board, { cascade: true })
  columns!: ColumnEntity[];

  @OneToMany(() => Card, (card) => card.board)
  cards!: Card[];
}
