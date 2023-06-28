import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/common/common.dto';

export class QueryMenuDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
