import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  AfterInsert,
  AfterRemove,
} from 'typeorm';
import { Logs } from './logs.entity';
import { Roles } from './roles.entity';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user, { cascade: true })
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @AfterInsert()
  afterInsert() {
    console.log('afterInsert', this.id, this.username);
  }

  @AfterRemove()
  afterRemove() {
    console.log('afterRemove');
  }
}
