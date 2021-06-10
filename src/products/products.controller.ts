import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product.create.dto';
import { GetProductFilterDto } from './dtos/product.filter.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() productCreateDto: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(productCreateDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  //   @Patch('/:id/status')
  //   updateProductStatus(
  //       @Param('id') id:number,
  //       @Body()
  //   ){}
}
