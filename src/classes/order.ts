import { isPremiumDecorator } from "../decorators/premiumCustomers"
import { Status } from "../enums/status"
import { Customer } from "./customer"
import { Product } from "./product"

export class Order {
    public id: number
    public status: Status
    public customer: Customer
    public total: number = 0
    public products: Product[]

    constructor(id: number, status: Status, customer: Customer, products: Product[]) {
        this.id = id
        this.status = status
        this.customer = customer
        this.products = products
        this.total = products.map(p => p.price).reduce((acc, curr) => acc + curr, 0)
    }
}

// FIXME: Might not get the customerName correctly it can be undefined 
export type OrderSummary = Pick<Order, "status" | "total"> & { customerName: Order["customer"]["name"] } & { productNames: Product["name"]}