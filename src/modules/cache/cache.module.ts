import { Global, Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import config from 'configs/app.config';

import { AuthTokensCacheService } from './services';

@Global()
@Module({
  imports: [
    NestCacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: config.redis.getRedisConnectionString(),
      ttl: 0,
    }),
  ],
  providers: [AuthTokensCacheService],
  exports: [AuthTokensCacheService],
})
export class CacheModule {}
