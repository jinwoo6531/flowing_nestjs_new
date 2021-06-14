import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  store_name: string;

  @IsString()
  store_password: string;

  @IsNotEmpty()
  store_address: string;

  @IsNotEmpty()
  store_phone_number: string;

  // @IsDecimal()
  @IsNotEmpty()
  store_longitude: string;

  // @IsDecimal()
  @IsNotEmpty()
  store_latitude: string;

  // @IsString()
  @IsNotEmpty()
  store_business_hour: string;

  @IsNotEmpty()
  store_grade: string;

  //   @IsString()
  //   store_image: string;

  // @IsString()
  @IsNotEmpty()
  store_profile_image: string;

  // @IsString()
  @IsNotEmpty()
  store_closed_day: string;
}
