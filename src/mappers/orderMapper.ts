import { Order } from "../classes/order";
import { OrderEntity } from "../entities/order.entity";
import { CustomerMapper } from "./customerMapper";
import { ProductMapper } from "./productMapper";

export class OrderMapper {
    static toObject(entity: OrderEntity): Order {
        const mappedCustomerToObj = CustomerMapper.toObject(entity.customer)
        const mappedProductsToObj = entity.products.map(e => ProductMapper.toObject(e))
        
        return new Order(entity.id, entity.status, mappedCustomerToObj, mappedProductsToObj)
    }

    static toEntity(obj: Order): OrderEntity{
        const mappedCustomerToEntity = CustomerMapper.toEntity(obj.customer)
        const mappedProductsToEntity = obj.products.map(o => ProductMapper.toEntity(o))
        const entity = new OrderEntity()
        entity.id = obj.id
        entity.customer = mappedCustomerToEntity
        entity.products = mappedProductsToEntity
        entity.total = obj.total

        return entity
    }
}