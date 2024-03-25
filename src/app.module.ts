import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from 'configs/mikro-orm.config';

import { AuthenticationGuard } from 'modules/authorization/guards';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { CacheModule } from './modules/cache/cache.module';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    UsersModule,
    RoomsModule,
    AuthorizationModule,
    CacheModule,
    BookingModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
