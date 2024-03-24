import { IsBearer } from 'shared/decorators';

export class AccessTokenDto {
  @IsBearer()
  public readonly accessToken: string;
}
