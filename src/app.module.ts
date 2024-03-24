import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from 'configs/mikro-orm.config';

import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), UsersModule, RoomsModule],
})
export class AppModule {}
