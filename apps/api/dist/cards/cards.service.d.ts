import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';
export declare class CardsService {
    private cardsRepo;
    constructor(cardsRepo: Repository<Card>);
    create(dto: CreateCardDto): Promise<Card>;
    update(id: string, dto: UpdateCardDto): Promise<Card>;
    remove(id: string): Promise<void>;
    upvote(id: string): Promise<Card>;
}
