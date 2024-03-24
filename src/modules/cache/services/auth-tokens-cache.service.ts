import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Milliseconds } from 'shared/types';
import { CacheKey } from '../enums';

@Injectable()
export class AuthTokensCacheService {
  private readonly logger = new Logger(AuthTokensCacheService.name);

  public constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  public async setTokenToWhitelist(userId: number, token: string, ttl: Milliseconds): Promise<void> {
    this.logger.log(`Setting token ${token} to cache with ttl ${ttl}`);

    await this.cacheManager.set(`${CacheKey.TOKEN}:${token}:${userId}`, userId, ttl);
  }

  public async isTokenWhitelisted(userId: number, token: string): Promise<boolean> {
    this.logger.log(`Getting token from cache`);

    const data = await this.cacheManager.get<number>(`${CacheKey.TOKEN}:${token}:${userId}`);

    return data && data === userId;
  }

  public async deleteTokenFromWhitelist(userId: number): Promise<void> {
    this.logger.log(`Deleting tokens for user ${userId} from cache`);

    const tokes = await this.cacheManager.store.keys(`${CacheKey.TOKEN}:*:${userId}`);

    await Promise.all(tokes.map((token) => this.cacheManager.del(token)));
  }
}
