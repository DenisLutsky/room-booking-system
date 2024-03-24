import { IsBearer } from 'shared/decorators';
import { AuthTokens } from '../interfaces';

export class AuthTokensDto implements AuthTokens {
  @IsBearer()
  public readonly accessToken: string;

  @IsBearer()
  public readonly refreshToken: string;
}
