import { EntityManager, FindOptionsWhere, Or, UpdateResult } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { BaseService } from "./base.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class OrderService extends BaseService {
    async addOrder(order: OrderEntity, manager?: EntityManager): Promise<OrderEntity> {
        return this.rep(OrderEntity, manager).save(order)
    }

    async updateOrder(where: FindOptionsWhere<OrderEntity>, data: QueryDeepPartialEntity<OrderEntity>, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(OrderEntity, manager).update(where, data)
    }

    async findOrder(id: number, manager?: EntityManager): Promise<OrderEntity> {
        return this.rep(OrderEntity, manager)
        .findOne({
            where: { id },
            relations: { items: true },
        })
    }

    async removeOrder(order: OrderEntity, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(OrderEntity, manager).softDelete(order.id)
    }
}