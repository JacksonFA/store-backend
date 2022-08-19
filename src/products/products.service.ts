import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.productRepo.delete(id);
  }
}
