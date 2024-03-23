import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { SuperAdminSeeder } from './super-admin.seeder';

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager, context: Dictionary): Promise<void> {
    return this.call(em, [SuperAdminSeeder], context);
  }
}
