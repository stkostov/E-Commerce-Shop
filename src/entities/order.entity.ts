import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Status } from "../enums/status"
import { CustomerEntity } from "./customer.entity"
import { ProductEntity } from "./product.entity"

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ type: "enum", enum: Status })
    public status: Status

    @Column("decimal")
    public total: number

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders, { eager: true })
    public customer: CustomerEntity

    @OneToMany(() => ProductEntity, (product) => product.order)
    products: ProductEntity[]
}