import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a card to a board' })
  create(@Body() dto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card' })
  update(@Param('id') id: string, @Body() dto: UpdateCardDto): Promise<Card> {
    return this.cardsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cardsService.remove(id);
  }

  @Post(':id/upvote')
  @ApiOperation({ summary: 'Upvote a card' })
  upvote(@Param('id') id: string): Promise<Card> {
    return this.cardsService.upvote(id);
  }
}
