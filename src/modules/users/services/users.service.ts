import { Injectable, Logger } from '@nestjs/common';

import { User } from '../interfaces';
import { UserEntity } from '../entities';
import { UsersRepository } from '../repositories';
import { PaginatedResult, Pagination } from 'shared/interfaces';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(private readonly usersRepository: UsersRepository) {}

  public async createUser(input: User): Promise<UserEntity> {
    this.logger.log(`Creating user ${input.email}`);

    return await this.usersRepository.insertUser(input);
  }

  public async getUsers(input: Pagination): Promise<PaginatedResult<UserEntity>> {
    this.logger.log('Getting users paginated');

    return await this.usersRepository.selectUsers(input);
  }
}
