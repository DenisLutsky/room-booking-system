import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, FindOptions, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { PaginatedResult, Pagination } from 'shared/interfaces';
import { FindUserInput, User } from '../interfaces';
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

  public async selectOneUser(input: FindUserInput): Promise<UserEntity> {
    this.logger.log(`Selecting user record with filer`);

    const filer: FilterQuery<UserEntity> = {};

    if (input.userId) filer.userId = input.userId;
    if (input.email) filer.email = input.email;

    return await this.orm.em.findOne(UserEntity, filer);
  }

  public async updateUser(user: UserEntity, input: Partial<User>): Promise<UserEntity> {
    this.logger.log(`Updating record for user ${user.userId}`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.assign(input);

    await this.orm.em.persistAndFlush(user);

    return user;
  }

  public async deleteUser(user: UserEntity): Promise<void> {
    this.logger.log(`Deleting record for user ${user.userId}`);

    await this.orm.em.removeAndFlush(user);
  }
}
