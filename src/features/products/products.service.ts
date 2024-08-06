import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../common/dto/product/create.product.dto';
import { UpdateProductDto } from '../../common/dto/product/update.product.dto';
import { CreateProductInterface } from 'src/common/interfaces/products/create.product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/repositories/products.repository';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductRepository) private readonly productRepository: ProductRepository
  ) {}

  async addProduct(payload: CreateProductInterface) {
   return await this.productRepository.addProduct(payload)
  }

  findAll() {
    return `This action returns all products`;
  }

  async findById(id: string) {
    return await this.productRepository.findById(id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
