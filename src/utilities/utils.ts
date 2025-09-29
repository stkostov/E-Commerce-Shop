import { Customer } from "../classes/customer";
import { Order } from "../classes/order";
import { Product } from "../classes/product";
import { isPremiumDecorator } from "../decorators/premiumCustomers";
import { CustomerEntity } from "../entities/customer.entity";
import { OrderEntity } from "../entities/order.entity";
import { ProductEntity } from "../entities/product.entity";
import { CustomerMapper } from "../mappers/customerMapper";
import { OrderMapper } from "../mappers/orderMapper";
import { ProductMapper } from "../mappers/productMapper";

type ObjectEntityMap = {
  Customer: { obj: Customer; entity: CustomerEntity }
  Order: { obj: Order; entity: OrderEntity }
  Product: { obj: Product; entity: ProductEntity }
}

export class Utils {
    static ObjToEntity<T extends keyof ObjectEntityMap>(obj: ObjectEntityMap[T]["obj"]): ObjectEntityMap[T]["entity"] {
        if (obj instanceof Customer) {
            return CustomerMapper.toEntity(obj)
        }
        if (obj instanceof Order) {
            return OrderMapper.toEntity(obj)
        }
        if (obj instanceof ProductEntity) {
            return ProductMapper.toEntity(obj)
        }
        
        throw new Error("Unsupported class type")
    }

    static EntityToObj<T extends keyof ObjectEntityMap>(entity: ObjectEntityMap[T]["entity"]): ObjectEntityMap[T]["obj"] {
        if (entity instanceof CustomerEntity) {
            return CustomerMapper.toObject(entity)
        }
        if (entity instanceof OrderEntity) {
            return OrderMapper.toObject(entity)
        }
        if (entity instanceof ProductEntity) {
            return ProductMapper.toObject(entity)
        }
        
        throw new Error("Unsupported entity type")
    }

    @isPremiumDecorator()
    static calculatePremiumDiscount(order: Order) {
        console.log("method: " + order)
        return order.total * 0.8 // 20% off
    }
}