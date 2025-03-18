import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInUserInfraDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
