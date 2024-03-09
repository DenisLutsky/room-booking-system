import 'dotenv/config';
import { env } from 'node:process';
import { WorkingEnvironments } from 'shared/enums';

const config = {
  app: {
    port: parseInt(env.APP_PORT, 10) || 3000,
    environment: env.NODE_ENV || WorkingEnvironments.DEVELOPMENT,
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
    debug: env.NODE_ENV === WorkingEnvironments.DEVELOPMENT && env.DB_DEBUG === 'true',
  },
};

export default config;
