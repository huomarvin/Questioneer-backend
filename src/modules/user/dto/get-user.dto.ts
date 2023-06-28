import { PaginationDto } from '@/common/common.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class GetUserDto extends PaginationDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsArray()
  @IsOptional()
  roles?: number[];

  @IsString()
  @IsOptional()
  gender?: number;
}
