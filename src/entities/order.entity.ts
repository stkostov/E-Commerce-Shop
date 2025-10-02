import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, RelationId } from "typeorm"
import { Status } from "../enums/status"
import { CustomerEntity } from "./customer.entity"
import { OrderItemEntity } from "./orderItems.entity"
import { applyPremiumDiscount } from "../decorators/premiumCustomers"
import { MoneyNumberColumn } from "../decorators/moneyTransform"

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ type: "enum", enum: Status })
    public status: Status

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders, { eager: true })
    @JoinColumn({ name: "customerId" })
    public customer: CustomerEntity

    @RelationId((o: OrderEntity) => o.customer) 
    public customerId!: number;

    @OneToMany(() => OrderItemEntity, i => i.order, { cascade: ["insert"] })
    public items!: OrderItemEntity[]

    @MoneyNumberColumn()
    private _total!: number;

    get total(): number { return this._total; }

    @applyPremiumDiscount()
    set total(v: number) {
        this._total = Number(v.toFixed(2))
  }
}