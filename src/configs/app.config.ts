import 'dotenv/config';
import { env } from 'node:process';

const config = {
  app: {
    port: parseInt(env.APP_PORT, 10) || 3000,
    environment: env.NODE_ENV || 'development',
  },
};

export default config;
