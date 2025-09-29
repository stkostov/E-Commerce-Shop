import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public price: number

    @Column()
    public stock: number

    @ManyToOne(() => OrderEntity, (order) => order.products)
    public order: OrderEntity
}