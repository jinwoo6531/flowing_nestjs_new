import { Controller, Post, Req, Res } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
export class UploadController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  async uploadImage(@Req() request, @Res() response) {
    try {
      await this.productsService.imageUpload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
