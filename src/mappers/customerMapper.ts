import { Customer } from "../classes/customer";
import { CustomerEntity } from "../entities/customer.entity";
import { OrderMapper } from "./orderMapper";

export class CustomerMapper {
    
    static toObject(entity: CustomerEntity): Customer {
        const mappedOrdersToObj = entity.orders.map(e => OrderMapper.toObject(e))
        return new Customer(entity.name, mappedOrdersToObj, entity.balance, entity.isPremium)
    }

    static toEntity(obj: Customer): CustomerEntity {
        const mappedOrdersToEntity = obj.orders.map(o => OrderMapper.toEntity(o))
        const entity = new CustomerEntity()
        entity.id = obj.id
        entity.balance = obj.balance
        entity.isPremium = obj.isPremium
        entity.name = obj.name
        entity.orders = mappedOrdersToEntity

        return entity
    }
}