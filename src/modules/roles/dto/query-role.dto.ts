import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@/common/common.dto';

export class QueryRoleDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
