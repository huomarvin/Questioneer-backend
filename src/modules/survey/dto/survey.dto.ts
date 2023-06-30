import { IsString, IsOptional, IsArray } from 'class-validator';

export class SurveyDto {
  @IsString()
  title: string;

  @IsArray()
  componentList: any;

  @IsString()
  @IsOptional()
  js: string;

  @IsString()
  @IsOptional()
  css: string;

  @IsString()
  @IsOptional()
  desc: string;
}
