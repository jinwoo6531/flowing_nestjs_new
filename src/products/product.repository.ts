import { InternalServerErrorException } from '@nestjs/common';
import { Store } from 'src/auth/entities/store.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductCreateDto } from './dtos/product.create.dto';
import { GetProductFilterDto } from './dtos/product.filter.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './product.enum';
import { Logger } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository', true);

  async createProduct(
    productCreateDto: ProductCreateDto,
    store: Store,
  ): Promise<Product> {
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
      store,
    });

    await this.save(product);
    return product;
  }
  //test
  async getProducts(
    filterDto: GetProductFilterDto,
    store: Store,
  ): Promise<Product[]> {
    const { useYn } = filterDto;

    const query = this.createQueryBuilder('product');
    query.where({ store });

    if (useYn) {
      query.where('product_use_yn = :useYn', { useYn });
    }

    try {
      const products = await query.getMany();

      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get products for store "${
          store.store_name
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
