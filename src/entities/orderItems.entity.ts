import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";
import { MoneyNumberColumn } from "../decorators/moneyTransform";

@Entity()
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => OrderEntity, o => o.items, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    public order: OrderEntity

    @Column() 
    public orderId: string;

    @ManyToOne(() => ProductEntity, { eager: true })
    @JoinColumn({ name: "productId" })
    public product: ProductEntity

    @RelationId((oi: OrderItemEntity) => oi.product) 
    public productId: number

    @Column("int") 
    public quantity: number

    @MoneyNumberColumn()
    public price: number
}