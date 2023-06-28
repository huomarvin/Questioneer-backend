import { User } from '@/entity/user.entity';
import { Logs } from '@/entity/logs.entity';
import { Roles } from '@/decorators/roles.decorator';
import { Menus } from '@/entity/menu.entity';

export const getEntities = (path: string) => {
  // /users ->User , /logs -> Logs, /roles -> Roles, /menus -> Menus, /auth -> 'Auth'
  const map = {
    '/users': User,
    '/logs': Logs,
    '/roles': Roles,
    '/menus': Menus,
    '/auth': 'Auth',
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i];
    if (path.startsWith(key)) {
      return map[key];
    }
  }
};
