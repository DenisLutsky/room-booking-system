import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import config from 'configs/app.config';

import { hashPassword } from 'shared/utils/passwords';
import { UserEntity } from 'modules/users/entities';

export class SuperAdminSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const superAdmin = await em.findOne(UserEntity, { email: config.admin.email });

    if (superAdmin) return;

    const hash = await hashPassword(config.admin.password);

    const newSuperAdmin = em.create(UserEntity, {
      email: config.admin.email,
      password: hash,
      superAdmin: true,
      verified: true,
    });

    await em.persistAndFlush(newSuperAdmin);
  }
}
