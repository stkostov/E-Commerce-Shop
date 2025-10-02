import { OrderEntity } from "../entities/order.entity";

export type OrderSummary = Pick<OrderEntity, "status" | "total"> & { customerName: string, productNames: string[] }

export class Utils {
    static orderSummery(order: OrderEntity): OrderSummary {
        return { status: order.status, total: order.total, customerName: order.customer.name, productNames: order.items.map(oi => oi.product.name)}
    }

    static randomNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static *rangeGenerator(n: number) {
        for (let i = 1; i <= n; i++) yield i
    }

    static randomList(min: number, max: number, length: number): number[] {
        return Array.from({ length: length }, () => Utils.randomNumberBetween(min, max))
    }
}