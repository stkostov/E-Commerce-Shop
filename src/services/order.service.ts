import { UpdateResult } from "typeorm";
import { Order } from "../classes/order";
import { AppDataSource } from "../data-source";
import { OrderEntity } from "../entities/order.entity";
import { OrderMapper } from "../mappers/orderMapper";

export class OrderService {
    private orderRepo = AppDataSource.getRepository(OrderEntity)

    async addOrder(order: Order): Promise<OrderEntity> {
        const orderToEntity = OrderMapper.toEntity(order)
        return this.orderRepo.save(orderToEntity)
    }

    async removeOrder(order: Order): Promise<UpdateResult> {
        const orderToEntity = OrderMapper.toEntity(order)
        return this.orderRepo.softDelete(orderToEntity.id)
    }
}