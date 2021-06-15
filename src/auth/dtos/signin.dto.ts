import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  store_name: string;

  @IsString()
  @IsNotEmpty()
  store_password: string;
}
