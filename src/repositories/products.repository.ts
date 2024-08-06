import { Injectable } from "@nestjs/common";
import { CreateProductInterface } from "src/common/interfaces/products/create.product.interface";
import { Products } from "src/entities/product.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()

export class ProductRepository extends Repository<Products> {
    constructor(private dataSource: DataSource) {
        super(Products, dataSource.createEntityManager());
    }

    async addProduct(payload: CreateProductInterface) {
        return await this.save(payload)
    }

    async findById(id: string) {
        return await this.findOne({ where : { id: id }})
    }

}