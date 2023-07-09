import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNotEmpty()
  @IsString()
  componentId: string;

  @IsOptional()
  @IsString()
  value: string;
}

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answerList: AnswerDto[];

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
