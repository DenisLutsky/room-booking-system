import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from 'configs/mikro-orm.config';
import { SuperAdminSeeder } from './seeds/super-admin.seeder';

const runMigrationsAndSeeds = async (): Promise<void> => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const migrator = orm.getMigrator();

  console.log('MikroORM initialized');

  const migrations = await migrator.getPendingMigrations();

  console.log(`Found ${migrations.length} pending migrations`);

  if (migrations && migrations.length > 0) {
    console.log('Running migrations...');

    await migrator.up();
  }

  console.log('Running AdminSeeder...');
  await new SuperAdminSeeder().run(orm.em);

  await orm.close(true);
};

runMigrationsAndSeeds()
  .then(() => console.log('Database migrated successfully'))
  .catch(console.error);
