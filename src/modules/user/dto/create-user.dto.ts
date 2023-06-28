import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from '@/entity/roles.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  password: string;

  roles?: Roles[] | number[];
}

export class CreateAdminUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @IsArray()
  @IsOptional()
  roles?: Roles[] | number[];
}

export class EditAdminUserDto extends CreateAdminUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}

export class CreateUserResDto {
  @IsInt()
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Expose()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  @Exclude()
  password: string;

  @Expose()
  roles?: Roles[] | number[];
}
