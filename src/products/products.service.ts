import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }

  private async findProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return product as Product;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  async getSigleProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async updateProduct(id: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(id);

    if (title) {
      updatedProduct.title = title;
    }

    if (desc) {
      updatedProduct.description = desc;
    }

    if (price) {
      updatedProduct.price = price;
    }

    updatedProduct.save();

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product');
    }
  }
}
