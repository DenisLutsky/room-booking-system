import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Trim } from 'shared/decorators';

export class CreateUserDto {
  @IsEmail()
  public readonly email!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Trim()
  public readonly password!: string;
}
