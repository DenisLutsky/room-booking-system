import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import config from 'configs/app.config';

import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from '../utils/tokens';
import { comparePasswords } from '../utils/passwords';
import { AuthPayload, AuthTokens } from '../interfaces';
import { AuthenticationDto } from '../dto';
import { User } from 'modules/users/interfaces';
import { UsersService } from 'modules/users/services';
import { AuthTokensCacheService } from 'modules/cache/services';
import { UserEntity } from 'modules/users/entities';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  public constructor(
    private readonly usersService: UsersService,
    private readonly authTokensCacheService: AuthTokensCacheService,
  ) {}

  private async generateTokensForUser(user: UserEntity): Promise<AuthTokens> {
    const authPayload: AuthPayload = {
      userId: user.userId,
      email: user.email,
      superAdmin: user.superAdmin,
      deleted: user.deleted,
    };

    const accessToken = generateAccessToken(authPayload);
    const refreshToken = generateRefreshToken(authPayload);

    const { ttl } = config.security;

    await Promise.all([
      this.authTokensCacheService.deleteTokenFromWhitelist(user.userId),
      this.authTokensCacheService.setTokenToWhitelist(user.userId, accessToken, ttl.accessToken * 1000),
      this.authTokensCacheService.setTokenToWhitelist(user.userId, refreshToken, ttl.refreshToken * 1000),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // TODO: implement two step registration process with email confirmation
  public async registerNewUser(input: User): Promise<AuthTokens> {
    this.logger.log(`Registering new user with email ${input.email}`);

    // TODO: add real-time email validation
    const existingUser = await this.usersService.getOneUserByEmail(input.email);
    if (existingUser) throw new ConflictException('User with this email already exists');

    const newUser = await this.usersService.createUser(input);

    return await this.generateTokensForUser(newUser);
  }

  public async generateTokens(input: AuthenticationDto): Promise<AuthTokens> {
    this.logger.log(`Generating tokens for user with email ${input.email}`);

    const user = await this.usersService.getOneUserByEmail(input.email);
    const correctPassword = user && (await comparePasswords(input.password, user.password));

    if (!user || !correctPassword) throw new UnauthorizedException('Wrong email or password');

    return await this.generateTokensForUser(user);
  }

  public async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    this.logger.log('Refreshing tokens');

    const { userId } = verifyRefreshToken(refreshToken);
    const isTokenWhitelisted = await this.authTokensCacheService.isTokenWhitelisted(userId, refreshToken);

    if (!isTokenWhitelisted) throw new UnauthorizedException('Invalid refresh token');

    const [_, user] = await Promise.all([
      this.authTokensCacheService.deleteTokenFromWhitelist(userId),
      this.usersService.getOneUserById(userId),
    ]);

    return await this.generateTokensForUser(user);
  }

  public async nullifyTokens({ accessToken, refreshToken }: AuthTokens): Promise<void> {
    this.logger.log('Nullifying tokens');

    let userId: number;

    try {
      const accessTokenPayload = verifyAccessToken(accessToken);
      userId = accessTokenPayload.userId;
    } catch (error) {
      this.logger.warn('Error while nullifying tokens', error);

      const refreshTokenPayload = verifyRefreshToken(refreshToken);
      userId = refreshTokenPayload.userId;
    } finally {
      userId && (await this.authTokensCacheService.deleteTokenFromWhitelist(userId));
    }
  }
}
