import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `用户名长度必须在$constraint1到$constraint2之间，当前传递的值是：$value`,
  })
  username: string;

  @IsString({
    message: '昵称必须是一个字符串类型',
  })
  @IsOptional()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64, {
    message: '密码长度必须在$constraint1到$constraint2之间',
  })
  password: string;
}
