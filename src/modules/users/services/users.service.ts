import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { hashPassword } from 'shared/utils/passwords';
import { PaginatedResult, Pagination } from 'shared/interfaces';
import { User } from '../interfaces';
import { UserEntity } from '../entities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(private readonly usersRepository: UsersRepository) {}

  public async createUser(input: User): Promise<UserEntity> {
    this.logger.log(`Creating user ${input.email}`);

    input.password = await hashPassword(input.password);

    return await this.usersRepository.insertUser(input);
  }

  public async getUsers(input: Pagination): Promise<PaginatedResult<UserEntity>> {
    this.logger.log('Getting users paginated');

    return await this.usersRepository.selectUsers(input);
  }

  public async getUser(userId: number): Promise<UserEntity> {
    this.logger.log(`Getting user ${userId}`);

    const user = await this.usersRepository.selectOneUser(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return user;
  }

  public async updateUser(userId: number, input: Partial<User>): Promise<UserEntity> {
    this.logger.log(`Updating user ${userId}`);

    if (input.password) input.password = await hashPassword(input.password);

    const user = await this.usersRepository.selectOneUser(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return await this.usersRepository.updateUser(user, input);
  }

  public async deleteUser(userId: number): Promise<void> {
    this.logger.log(`Deleting user ${userId}`);

    const user = await this.usersRepository.selectOneUser(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return await this.usersRepository.deleteUser(user);
  }
}
