import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ColumnsModule {}
