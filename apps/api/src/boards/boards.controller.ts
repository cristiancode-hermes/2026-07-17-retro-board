import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @ApiOperation({ summary: 'List all boards' })
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board with columns and cards' })
  findOne(@Param('id') id: string): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new retro board' })
  create(@Body() dto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update board details' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board' })
  remove(@Param('id') id: string): Promise<void> {
    return this.boardsService.remove(id);
  }
}
