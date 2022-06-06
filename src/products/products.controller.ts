import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.getSigleProduct(id);
    return product;
  }

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    const newId = await this.productsService.insertProduct(title, desc, price);

    return { id: newId };
  }

  @Patch(':id')
  async updateProduct(
    @Query('title') title: string,
    @Query('description') desc: string,
    @Query('price') price: number,
    @Param('id') id: string,
  ) {
    const product = await this.productsService.updateProduct(
      id,
      title,
      desc,
      price,
    );
    return product;
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    return null;
  }
}
