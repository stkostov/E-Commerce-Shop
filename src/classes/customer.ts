import { Order } from "./order"

export class Customer {
    public id: number
    public name: string
    public orders: Order[]
    public balance: number
    public isPremium: boolean

    constructor(name: string, orders: Order[], balance: number, isPremium: boolean) {
        this.name = name
        this.orders = orders
        this.balance = balance
        this.isPremium = isPremium
    }

    public getDiscount() {
        if (!this.isPremium) throw new Error("Discounts are only applicable to premium customers!")

        console.log("Doing a discount!")
        // TODO: Make discount logic
    }
}