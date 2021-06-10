import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProductCreateDto } from './dtos/product.create.dto';
import { GetProductFilterDto } from './dtos/product.filter.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './product.enum';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
    const {
      product_title,
      product_price,
      product_discount_price,
      product_account,
      product_main_image,
      product_first_image,
      product_second_image,
      product_category,
      product_keyword,
      product_method,
    } = productCreateDto;

    const product = this.create({
      product_title,
      product_price,
      product_discount_price,
      product_account,
      product_main_image,
      product_first_image,
      product_second_image,
      product_category,
      product_keyword,
      product_method,
      product_use_yn: ProductStatus.Y,
    });

    await this.save(product);
    return product;
  }

  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    console.log(123, filterDto);

    const { useYn } = filterDto;

    //product엔티티 참조
    const query = this.createQueryBuilder('product');

    if (useYn) {
      query.where('product_use_yn = :useYn', { useYn });
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
