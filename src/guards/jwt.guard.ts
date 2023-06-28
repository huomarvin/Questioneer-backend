import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await verify(
        token,
        this.configService.get(ConfigEnum.SECRET),
      );
      const username = payload['username'];
      const tokenCache = username ? await this.redis.get(username) : null;
      // 1、处理未登录情况
      // 2、处理token过期情况
      // 3、处理token被篡改情况
      // 4、处理没有用户id的情况，即payload.sub不存在的情况，如果没有用户id，会影响到数据库存储于查询
      if (!payload || tokenCache !== token || !payload.sub) {
        throw new UnauthorizedException();
      }

      const parentCanActivate = (await super.canActivate(context)) as boolean;
      return parentCanActivate;
    } catch (e) {
      console.log(
        '🚀 ~ file: jwt.guard.ts:41 ~ JwtGuard ~ canActivate ~ e:',
        e,
      );
      throw new UnauthorizedException();
    }
  }
}
