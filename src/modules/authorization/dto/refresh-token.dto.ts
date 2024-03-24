import { IsBearer } from 'shared/decorators';

export class RefreshTokenDto {
  @IsBearer()
  public readonly refreshToken: string;
}
