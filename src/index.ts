import { Customer } from "./classes/customer";
import { Order } from "./classes/order";
import { Product } from "./classes/product";
import { AppDataSource } from "./data-source";
import { Status } from "./enums/status";
import { Utils } from "./utilities/utils";

async function main() {
    console.log("running main()")
    try {
        await AppDataSource.initialize();
        console.log("DB initialized successfully");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
    
    let product = new Product("Bankai", 10, 100)
    let order = new Order(1, Status.ORDERED, null, [product])
    let customer = new Customer("Bleach", [order], 1000, true)

    order.customer = customer
    Utils.calculatePremiumDiscount(order)
}

main()