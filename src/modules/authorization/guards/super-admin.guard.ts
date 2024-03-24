import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { RequestContext } from 'shared/utils/async-storage';
import { AsyncStoreEntity } from 'shared/enums';
import { AuthPayload } from '../interfaces';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  private readonly logger = new Logger(SuperAdminGuard.name);
  public canActivate(_: ExecutionContext): boolean {
    this.logger.debug(`Checking if user is a super admin`);

    const { superAdmin, userId } = RequestContext.get<AuthPayload>(AsyncStoreEntity.USER);

    if (!superAdmin) {
      this.logger.warn(`Authorized user ${userId} is not a super admin`);

      return false;
    }

    return true;
  }
}
