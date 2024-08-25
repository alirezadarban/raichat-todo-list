import { IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}