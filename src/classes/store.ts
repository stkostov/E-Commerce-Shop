import { Customer } from "./customer"
import { Order } from "./order"
import { Product } from "./product"


class Store {
    static #created: Store | null = null
    public Product: Product[] = []
    public orders: Order[] = []
    public customers: Customer[] = []

    constructor() {
        if (Store.#created) {
            throw new Error("Use Store.getInstance()")
        }
    }

    static getInstance(): Store {
        if (!Store.#created) {
            Store.#created = new Store()
        }

        return Store.#created
    }
}