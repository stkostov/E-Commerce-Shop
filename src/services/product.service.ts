import { UpdateResult } from "typeorm";
import { Product } from "../classes/product";
import { AppDataSource } from "../data-source";
import { ProductEntity } from "../entities/product.entity";
import { ProductMapper } from "../mappers/productMapper";

export class ProductService {
    private productRepo = AppDataSource.getRepository(ProductEntity)

    async addProduct(product: Product): Promise<ProductEntity> {
        const productToEntity = ProductMapper.toEntity(product)
        return this.productRepo.save(productToEntity)
    }

    async removeProduct(product: Product): Promise<UpdateResult> {
        const productToEntity = ProductMapper.toEntity(product)
        return this.productRepo.softDelete(productToEntity.id)
    }
}