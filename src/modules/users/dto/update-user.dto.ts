import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { Trim } from 'shared/decorators';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  public readonly email!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  public readonly password!: string;

  @IsBoolean()
  @IsOptional()
  public readonly deleted!: boolean;
}
