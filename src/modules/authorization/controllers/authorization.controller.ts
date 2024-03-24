import { Body, Controller, Delete, Post, Put } from '@nestjs/common';

import { AuthTokens } from '../interfaces';
import { AuthenticationDto, AuthTokensDto, RefreshTokenDto, RegistrationDto } from '../dto';
import { AuthorizationService } from '../services';
import { SkipGuards } from 'shared/decorators/skip-guards.decorator';
import { AuthenticationGuard } from '../guards';

@Controller('authorization')
@SkipGuards(AuthenticationGuard)
export class AuthorizationController {
  public constructor(private readonly registrationService: AuthorizationService) {}

  @Post('register')
  private async register(@Body() input: RegistrationDto): Promise<AuthTokens> {
    return await this.registrationService.registerNewUser(input);
  }

  @Post('generate-tokens')
  private async generateTokens(@Body() input: AuthenticationDto): Promise<AuthTokens> {
    return await this.registrationService.generateTokens(input);
  }

  @Put('refresh-tokens')
  private async refreshTokens(@Body() { refreshToken }: RefreshTokenDto): Promise<AuthTokens> {
    return await this.registrationService.refreshTokens(refreshToken);
  }

  @Delete('nullify-tokens')
  private async nullifyTokens(@Body() input: AuthTokensDto): Promise<void> {
    return await this.registrationService.nullifyTokens(input);
  }
}
