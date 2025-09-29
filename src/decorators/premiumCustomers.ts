import { Order } from "../classes/order"

export function isPremiumDecorator() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value
        descriptor.value = function(args: any) {
            const order: Order = args
            if (!order.customer.isPremium) {
                throw new Error("Must be a premium customer for the discount!")
            }
            return originalMethod.call(this, args)
        }
    }
}