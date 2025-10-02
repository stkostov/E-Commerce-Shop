import "reflect-metadata"
import { DataSource } from "typeorm"
import { OrderEntity } from "./entities/order.entity"
import { CustomerEntity } from "./entities/customer.entity"
import { ProductEntity } from "./entities/product.entity"
import { OrderItemEntity } from "./entities/orderItems.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "stefan",
    password: "12345678",
    database: "ecommerse",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [OrderEntity, CustomerEntity, ProductEntity, OrderItemEntity],
    migrations: [],
    migrationsTableName: "ecommerce",
    subscribers: [],
})
