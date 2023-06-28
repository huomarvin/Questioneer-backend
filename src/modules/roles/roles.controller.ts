import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtGuard } from '@/guards/jwt.guard';
import { QueryRoleDto } from './dto/query-role.dto';
import { CaslGuard } from '@/guards/casl.guard';

@Controller('roles')
// @Roles(Role.Admin)
// @UseGuards(JwtGuard, RoleGuard)
@UseGuards(JwtGuard, CaslGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() query: QueryRoleDto) {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  // 不可以删除id是1的角色 管理员用户禁止被删除
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
