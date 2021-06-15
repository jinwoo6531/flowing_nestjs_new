import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Store } from 'src/auth/entities/store.entity';
import { GetStore } from 'src/auth/get-store.decorator';
import { ProductCreateDto } from './dtos/product.create.dto';
import { GetProductFilterDto } from './dtos/product.filter.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Logger } from '@nestjs/common';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductFilterDto,
    @GetStore() store: Store,
  ): Promise<Product[]> {
    this.logger.verbose(
      `Store "${
        store.store_name
      }" retrieving all products. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.productService.getProducts(filterDto, store);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: number,
    @GetStore() store: Store,
  ): Promise<Product> {
    return this.productService.getProductById(id, store);
  }

  @Post()
  createProduct(
    @Body() productCreateDto: ProductCreateDto,
    @GetStore() store: Store,
  ): Promise<Product> {
    this.logger.verbose(
      `Store "${
        store.store_name
      }" creating a new product. Data: ${JSON.stringify(productCreateDto)}`,
    );
    return this.productService.createProduct(productCreateDto, store);
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
