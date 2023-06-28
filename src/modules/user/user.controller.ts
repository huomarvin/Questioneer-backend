import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
  UseFilters,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/entity/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { TypeormFilter } from '@/filters/typeorm.filter';
import { CreateUserPipe } from './pipes/create-user.pipe';
import {
  CreateUserDto,
  CreateAdminUserDto,
  CreateUserResDto,
} from './dto/create-user.dto';
import { AdminGuard } from '@/guards/admin.guard';
import { JwtGuard } from '@/guards/jwt.guard';
import { Serialize } from '@/decorators/serialize.decorator';
import { PublicUserDto } from './dto/public-user.dto';

@Controller('user')
@UseFilters(new TypeormFilter(new Logger()))
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  /** 获取个人信息 */
  @Get('/profile')
  @UseGuards(JwtGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: number) {
    return this.userService.findProfile(id);
  }

  /** 获取用户日志 */
  @Get('/logs/:id')
  getUserLogs(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserLogs(id);
  }

  @Get('/logsByGroup')
  async getLogsByGroup() {
    const res = await this.userService.findLogsByGroup(2);
    return res;
  }

  @Get()
  @UseGuards(AdminGuard)
  @Serialize(PublicUserDto)
  getUsers(@Query() query: GetUserDto): any {
    return this.userService.findAll(query);
  }

  @Post()
  @Serialize(CreateUserResDto)
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as User;
    return this.userService.create(user);
  }

  @Post('admin')
  @Serialize(CreateUserResDto)
  // TODO: 添加管理员校验
  addAdminUser(@Body(CreateUserPipe) dto: CreateAdminUserDto): any {
    const user = dto as User;
    if (!user.password) {
      // TODO: 如果是从admin端创建的用户那么不会传递密码，这里需要设置一个默认密码
      // 后续考虑使用邮箱激活的方式来处理
      user.password = '123456';
    }
    return this.userService.create(user);
  }

  @Patch('/admin/:id')
  @Serialize(CreateUserResDto)
  updateAdminUser(
    @Body() dto: CreateAdminUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = dto as User;
    return this.userService.update(id, user);
  }

  @Delete('/admin/:id')
  @Serialize(CreateUserResDto)
  deleteAdminUser(@Param('id') id: number, @Req() req) {
    // 不能删除自己
    if (req.user?.userId === id) {
      throw new UnauthorizedException();
    }
    return this.userService.remove(id);
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): any {
    // TODO: 只有本人才可以更新自己的内容
    if (id === parseInt(req.user?.userId)) {
      // 说明是同一个用户在修改
      // todo
      // 权限1：判断用户是否是自己
      // 权限2：判断用户是否有更新user的权限
      // 返回数据：不能包含敏感的password等信息
      const user = dto as User;
      return this.userService.update(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
