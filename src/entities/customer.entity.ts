import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderEntity } from "./order.entity"

@Entity()
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public isPremium: boolean

    @Column()
    public balance: number

    @OneToMany(() => OrderEntity, (order) => order.customer)
    public orders: OrderEntity[]
}