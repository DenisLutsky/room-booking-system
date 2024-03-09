import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, FindOptions, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { PaginatedResult, Pagination } from 'shared/interfaces';
import { User } from '../interfaces';
import { UserEntity } from '../entities';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertUser(input: User): Promise<UserEntity> {
    this.logger.log(`Inserting record for user ${input.email}`);

    const user = this.orm.em.create(UserEntity, input);
    await this.orm.em.persistAndFlush(user);

    return user;
  }

  public async selectUsers(input: Pagination): Promise<PaginatedResult<UserEntity>> {
    this.logger.log('Selecting users');

    const filter: FilterQuery<UserEntity> = {};
    const options: FindOptions<UserEntity> = {
      limit: input.limit,
      offset: (input.page - 1) * input.limit,
    };

    const [users, count] = await this.orm.em.findAndCount(UserEntity, filter, options);

    return {
      items: users,
      count,
    };
  }
}
