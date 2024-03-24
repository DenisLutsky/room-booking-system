import { Module } from '@nestjs/common';

import { AuthorizationController } from './controllers';
import { AuthorizationService } from './services';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
