import { EntityManager, FindOptionsWhere, UpdateResult } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";
import { BaseService } from "./base.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class CustomerService extends BaseService {
    async addCustomer(customer: CustomerEntity, manager?: EntityManager): Promise<CustomerEntity> {
        return this.rep(CustomerEntity, manager).save(customer)
    }

    async updateCustomer(where: FindOptionsWhere<CustomerEntity>, data: QueryDeepPartialEntity<CustomerEntity>, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(CustomerEntity, manager).update(where, data)
    }

    async getCount(): Promise<number> {
        return this.rep(CustomerEntity).count()
    }

    async removeCustomer(customer: CustomerEntity, manager?: EntityManager): Promise<UpdateResult> {
        return this.rep(CustomerEntity, manager).softDelete(customer.id)
    }

    async findCustomer(id: number, manager?: EntityManager): Promise<CustomerEntity> {
        return this.rep(CustomerEntity, manager)
        .findOne({
            where: { id },
            relations: { orders: true },
        })
    }
}