import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ description: 'Board title' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Sprint name/number' })
  @IsString()
  @IsOptional()
  sprintName?: string;

  @ApiPropertyOptional({ description: 'Board description' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateBoardDto {
  @ApiPropertyOptional({ description: 'Board title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Sprint name/number' })
  @IsString()
  @IsOptional()
  sprintName?: string;

  @ApiPropertyOptional({ description: 'Board description' })
  @IsString()
  @IsOptional()
  description?: string;
}
