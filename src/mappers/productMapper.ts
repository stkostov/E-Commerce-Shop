import { Product } from "../classes/product";
import { ProductEntity } from "../entities/product.entity";

export class ProductMapper {
  static toObject(entity: ProductEntity): Product {
    return new Product(entity.name, Number(entity.price), entity.stock)
  }

  static toEntity(obj: Product): ProductEntity {
    const entity = new ProductEntity()
    entity.name = obj.name
    entity.price = obj.price
    entity.stock = obj.stock
    return entity
  }
}