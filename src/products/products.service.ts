import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from './dtos/product.create.dto';
import { GetProductFilterDto } from './dtos/product.filter.dto';
import { Store } from 'src/auth/entities/store.entity';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private configService: ConfigService,
  ) {
    AWS.config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  }
  AWS_S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  s3 = new AWS.S3();

  //상품 불러오기
  async getProducts(
    filterDto: GetProductFilterDto,
    store: Store,
  ): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto, store);
  }

  //상품 등록
  createProduct(
    productCreateDto: ProductCreateDto,
    store: Store,
  ): Promise<Product> {
    return this.productRepository.createProduct(productCreateDto, store);
  }

  //상품 ID GET
  async getProductById(id: number, store: Store): Promise<Product> {
    const found = await this.productRepository.findOne({
      where: { id, store },
    });

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

  async imageUpload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: this.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (_request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}
