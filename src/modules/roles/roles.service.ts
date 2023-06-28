import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../../entity/roles.entity';
import { Repository } from 'typeorm';
import { QueryRoleDto } from './dto/query-role.dto';
import {
  conditionUtils,
  handlePageParams,
  paginationUtils,
} from '@/utils/db.helper';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(query: QueryRoleDto) {
    const { name } = query;
    const { take, skip, currentPage, pageSize } = handlePageParams(query);
    const obj = {
      'role.name': name,
    };
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menus');
    const newQuery = conditionUtils<Roles>(queryBuilder, obj);
    const result = await paginationUtils(
      newQuery.take(take).skip(skip).getManyAndCount(),
      currentPage,
      pageSize,
    );
    return result;
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const newRole = this.roleRepository.merge(role, updateRoleDto);
    return this.roleRepository.save(newRole);
  }

  remove(id: number) {
    // delete  -> AfterRemove 不会触发
    return this.roleRepository.delete(id);
  }
}
