import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderEntity } from "./order.entity"
import { MoneyNumberColumn } from "../decorators/moneyTransform"

@Entity()
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    public id?: number

    @Column()
    public name: string

    @Column()
    public isPremium: boolean

    @MoneyNumberColumn()
    public balance: number

    @OneToMany(() => OrderEntity, (order) => order.customer)
    public orders?: OrderEntity[]
}