import { OrderEntity } from "../entities/order.entity";

export function applyPremiumDiscount() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const origSet = descriptor.set!
    descriptor.set = function (this: OrderEntity, value: number) {
      if (this.customer?.isPremium) value = +(value * 0.8).toFixed(2)
      return origSet.call(this, value)
    };
    return descriptor;
  };
}