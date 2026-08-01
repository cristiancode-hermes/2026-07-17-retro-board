import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(dto: CreateCardDto): Promise<Card>;
    update(id: string, dto: UpdateCardDto): Promise<Card>;
    remove(id: string): Promise<void>;
    upvote(id: string): Promise<Card>;
}
