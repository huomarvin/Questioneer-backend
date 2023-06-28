import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menus } from '../../entity/menu.entity';
import { Repository } from 'typeorm';
import {
  conditionUtils,
  handlePageParams,
  paginationUtils,
} from '@/utils/db.helper';
import { QueryMenuDto } from './dto/query-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus) private menuRepository: Repository<Menus>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    if (Array.isArray(createMenuDto.acl)) {
      createMenuDto.acl = createMenuDto.acl.join(',');
    }
    const menu = await this.menuRepository.create(createMenuDto as Menus);
    return this.menuRepository.save(menu);
  }

  async findAll(query: QueryMenuDto) {
    const { name } = query;
    const { take, skip, currentPage, pageSize } = handlePageParams(query);
    const obj = {
      name: name,
    };
    const queryBuilder = this.menuRepository.createQueryBuilder('menu');
    const newQuery = conditionUtils<Menus>(queryBuilder, obj);
    const result = await paginationUtils(
      newQuery.take(take).skip(skip).getManyAndCount(),
      currentPage,
      pageSize,
    );
    return result;
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    if (Array.isArray(updateMenuDto.acl)) {
      updateMenuDto.acl = updateMenuDto.acl.join(',');
    }
    const newMenu = await this.menuRepository.merge(
      menu,
      updateMenuDto as Menus,
    );
    return this.menuRepository.save(newMenu);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
