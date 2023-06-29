import { IsString, IsOptional } from 'class-validator';

export class SurveyDto {
  @IsString()
  @IsOptional()
  title: string;
}
