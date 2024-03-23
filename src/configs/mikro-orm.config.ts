import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import config from './app.config';

import { WorkingEnvironments } from 'shared/enums';
import { DatabaseSeeder } from 'src/database/seeds/database.seeder';

export default defineConfig({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  dbName: config.database.name,
  debug: config.database.debug,
  entities: ['dist/**/*.entity.js'],
  migrations: {
    tableName: 'metadata',
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    transactional: true,
    emit: config.app.environment !== WorkingEnvironments.DEVELOPMENT ? 'js' : 'ts',
  },
  seeder: {
    path: 'database/seeds',
    pathTs: 'src/database/seeds',
    defaultSeeder: DatabaseSeeder.name,
    emit: 'js',
  },
  allowGlobalContext: true,
  namingStrategy: EntityCaseNamingStrategy,
  extensions: [Migrator, SeedManager],
});
