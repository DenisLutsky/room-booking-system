import { IsBearer } from 'shared/decorators';

export class RefreshTokensDto {
  @IsBearer()
  public readonly refreshToken: string;
}
