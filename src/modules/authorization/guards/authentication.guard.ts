import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { RequestContext } from 'shared/utils/async-storage';
import { AsyncStoreEntity, MetaDataKey } from 'shared/enums';
import { verifyAccessToken } from '../utils/tokens';
import { AuthPayload } from '../interfaces';
import { AccessTokenDto } from '../dto';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  public constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const guardsToSkip = this.reflector.getAllAndOverride<unknown[]>(MetaDataKey.GUARDS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (guardsToSkip !== undefined && guardsToSkip.includes(AuthenticationGuard)) return true;

    this.logger.log(`Authenticating user`);

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const accessToken = headers.authorization;

    if (!accessToken) throw new UnauthorizedException(`Authorization header is missing`);

    const authorizationInput = plainToClass(AccessTokenDto, { accessToken });
    const errors = await validate(authorizationInput);

    if (errors.length) {
      this.logger.warn(`Authorization header is invalid`);

      const constraints = errors.map((error) => Object.values(error.constraints));

      throw new UnauthorizedException(constraints);
    }

    const { userId, email, superAdmin, deleted } = verifyAccessToken(authorizationInput.accessToken);

    if (deleted) {
      this.logger.warn(`User ${userId} is deleted`);

      throw new UnauthorizedException(`User ${userId} is deleted`);
    }

    RequestContext.set<AuthPayload>(AsyncStoreEntity.USER, {
      userId,
      email,
      superAdmin,
      deleted,
    });

    return true;
  }
}
