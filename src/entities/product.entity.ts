import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./orderItems.entity";
import { MoneyNumberColumn } from "../decorators/moneyTransform";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    public id?: number

    @Column()
    public name: string

    @MoneyNumberColumn()
    public price: number

    @Column()
    public stock: number

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
    public orderItems?: OrderItemEntity[]
}