import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Menus } from '@/entity/menu.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  menus: Menus[];
}
