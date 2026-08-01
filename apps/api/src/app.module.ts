import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/retroboard.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BoardsModule,
    CardsModule,
    ColumnsModule,
  ],
})
export class AppModule {}
