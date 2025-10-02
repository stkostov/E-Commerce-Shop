import { EntityManager, FindOptionsWhere, UpdateResult } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { BaseService } from "./base.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class ProductService extends BaseService {

    async addProduct(product: ProductEntity, manager?: EntityManager): Promise<ProductEntity> {
        return this.rep(ProductEntity, manager).save(product)
    }
    async updateProduc(where: FindOptionsWhere<ProductEntity>, data: QueryDeepPartialEntity<ProductEntity>, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(ProductEntity, manager).update(where, data)
    }

    async getCount(): Promise<number> {
        return this.rep(ProductEntity).count()
    }

    async removeProduct(product: ProductEntity, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(ProductEntity, manager).softDelete(product.id)
    }

    async findProduct(id: number, manager?: EntityManager): Promise<ProductEntity> {
        return this.rep(ProductEntity, manager)
        .findOne({ 
            where: { id },
            relations: { orderItems: true }
        })
    }
}