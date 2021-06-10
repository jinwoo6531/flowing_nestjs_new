import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from './dtos/product.create.dto';
import { ProductStatus } from './product.enum';
import { GetProductFilterDto } from './dtos/product.filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  //상품 불러오기
  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    console.log(filterDto);

    return this.productRepository.getProducts(filterDto);
  }

  //상품 등록
  createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
    return this.productRepository.createProduct(productCreateDto);
  }

  //상품 ID GET
  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`해당 상품 ${id}는 없습니다.`);
    }

    return found;
  }

  //상품 삭제
  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  //   async updateProductStatus(
  //     id: number,
  //     use_yn: ProductStatus,
  //   ): Promise<Product> {
  //     const product = await this.getProductById(id);

  //     product.product_use_yn = use_yn;
  //     await this.productRepository.save(product);

  //     return product;
  //   }
}
