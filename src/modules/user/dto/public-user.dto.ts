import { Exclude, Expose } from 'class-transformer';
import { Logs } from '@/entity/logs.entity';
import { Roles } from '@/entity/roles.entity';
import { Profile } from '@/entity/profile.entity';

export class PublicUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  // typescript -> 数据库 关联关系 Mapping
  @Expose()
  logs: Logs[];

  @Expose()
  roles: Roles[];

  @Expose()
  profile: Profile;

  // @AfterInsert()
  // afterInsert() {
  //   console.log('afterInsert', this.id, this.username);
  // }

  // @AfterRemove()
  // afterRemove() {
  //   console.log('afterRemove');
  // }
}
