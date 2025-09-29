import { UpdateResult } from "typeorm";
import { Customer } from "../classes/customer";
import { AppDataSource } from "../data-source";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerMapper } from "../mappers/customerMapper";

export class CustomerService {
    private customerRepo = AppDataSource.getRepository(CustomerEntity)

    async addCustomer(customer: Customer): Promise<CustomerEntity> {
        const customerToEntity = CustomerMapper.toEntity(customer)
        return this.customerRepo.save(customerToEntity)
    }

    async removeCustomer(customer: Customer): Promise<UpdateResult> {
        const customerToEntity = CustomerMapper.toEntity(customer)
        return this.customerRepo.softDelete(customerToEntity.id)
    }
}