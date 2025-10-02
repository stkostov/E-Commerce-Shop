import { AppDataSource } from "./data-source";
import { CustomerService } from "./services/customer.service";
import { OrderService } from "./services/order.service";
import { ProductService } from "./services/product.service";
import { StoreService } from "./services/store.service";
import { Utils } from "./utilities/utils";

async function main() {
    try {
        const ds = await AppDataSource.initialize();

        const productService = new ProductService(ds)
        const customerService = new CustomerService(ds)
        const orderService = new OrderService(ds)
        const storeService = new StoreService(productService, customerService, orderService)
        console.log("Seeding customers...")
        await storeService.seedCustomers()
        console.log("Seeding products...")
        await storeService.seedProducts()

        const customersCount = await customerService.getCount()
        const productCount = await productService.getCount()
        for(const customerId of [...Utils.rangeGenerator(customersCount)]) {
            try {
                const order = await storeService.createOrder(customerId, Utils.randomList(1, productCount, 5))
                await storeService.payOrder(order)
                await storeService.summerizeOrder(order.id)
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
}

main()