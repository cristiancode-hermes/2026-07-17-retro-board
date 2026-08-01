import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ description: 'Card text content' })
  @IsString()
  text!: string;

  @ApiPropertyOptional({ description: 'Author name' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ description: 'Column ID' })
  @IsUUID()
  columnId!: string;

  @ApiProperty({ description: 'Board ID' })
  @IsUUID()
  boardId!: string;
}

export class UpdateCardDto {
  @ApiPropertyOptional({ description: 'Card text content' })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({ description: 'Move to column ID' })
  @IsUUID()
  @IsOptional()
  columnId?: string;

  @ApiPropertyOptional({ description: 'Card position in column' })
  @IsInt()
  @IsOptional()
  position?: number;
}
