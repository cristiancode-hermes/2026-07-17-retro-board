import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepo: Repository<Card>,
  ) {}

  async create(dto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepo.create(dto);
    return this.cardsRepo.save(card);
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.cardsRepo.findOneBy({ id });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    await this.cardsRepo.update(id, dto);
    return this.cardsRepo.findOneBy({ id }) as Promise<Card>;
  }

  async remove(id: string): Promise<void> {
    const result = await this.cardsRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Card ${id} not found`);
  }

  async upvote(id: string): Promise<Card> {
    const card = await this.cardsRepo.findOneBy({ id });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    card.votes += 1;
    return this.cardsRepo.save(card);
  }
}
