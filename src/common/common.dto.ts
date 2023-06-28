import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @IsOptional()
  currentPage: number;
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
