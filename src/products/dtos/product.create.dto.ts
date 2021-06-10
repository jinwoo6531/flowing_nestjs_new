import { IsNotEmpty } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  product_title: string;

  @IsNotEmpty()
  product_price: number;

  @IsNotEmpty()
  product_discount_price: number;

  @IsNotEmpty()
  product_account: string;

  @IsNotEmpty()
  product_main_image: string;

  @IsNotEmpty()
  product_first_image: string;

  @IsNotEmpty()
  product_second_image: string;

  @IsNotEmpty()
  product_category: string;

  @IsNotEmpty()
  product_keyword: string;

  @IsNotEmpty()
  product_method: string;
}
