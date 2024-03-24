import { IsEmail, IsNotEmpty } from 'class-validator';
import { Trim } from 'shared/decorators';

export class AuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  public readonly email!: string;

  @IsNotEmpty()
  @Trim()
  public readonly password!: string;
}
