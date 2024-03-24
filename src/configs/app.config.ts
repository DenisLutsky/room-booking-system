import 'dotenv/config';
import { env } from 'node:process';
import { WorkingEnvironment } from 'shared/enums';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const config = {
  app: {
    port: parseInt(env.APP_PORT, 10) || 3000,
    environment: env.NODE_ENV || WorkingEnvironment.DEVELOPMENT,
  },
  admin: {
    email: env.ADMIN_EMAIL || 'admin@email.com',
    password: env.ADMIN_PASSWORD || 'vtv_pwn7mpm.yhy2TKC',
  },
  database: {
    user: env.POSTGRES_USER || 'postgres',
    password: env.POSTGRES_PASSWORD || 'password',
    host: env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(env.POSTGRES_PORT, 10) || 5432,
    name: env.POSTGRES_DB || 'postgres',
    debug: env.NODE_ENV === WorkingEnvironment.DEVELOPMENT && env.DB_DEBUG === 'true',
  },
  security: {
    secrets: {
      accessToken: env.ACCESS_TOKEN_SECRET || 'access-token-secret',
      refreshToken: env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
    },
    ttl: {
      // these values are in seconds because they are used in JWT
      accessToken: parseInt(env.ACCESS_TOKEN_TTL, 10) || 60 * 60, // 1 hour in seconds
      refreshToken: parseInt(env.REFRESH_TOKEN_TTL, 10) || 60 * 60 * 24 * 7, // 7 days in seconds
    },
  },
  redis: {
    secure: env.REDIS_TLS == 'true',
    tls: env.REDIS_TLS == 'true' ? 'rediss://:' : 'redis://:',
    password: env.REDIS_PASSWORD || '',
    host: env.REDIS_HOST || '127.0.0.1',
    port: parseInt(env.REDIS_PORT, 10) || 6379,
    getRedisConnectionString: (): string => {
      return `${config.redis.tls}${config.redis.password}@${config.redis.host}:${config.redis.port}`;
    },
  },
};

export default config;
