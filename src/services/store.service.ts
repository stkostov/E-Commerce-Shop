import { ProductService } from "./product.service"
import { CustomerService } from "./customer.service"
import { Status } from "../enums/status"
import { OrderService } from "./order.service"
import { ProductEntity } from "../entities/product.entity"
import { CustomerEntity } from "../entities/customer.entity"
import { OrderEntity } from "../entities/order.entity"
import { OrderItemEntity } from "../entities/orderItems.entity"
import { Utils } from "../utilities/utils"
import { AppDataSource } from "../data-source"
import { EntityManager } from "typeorm"

export class StoreService {
    constructor(private productService: ProductService,
                private customerService: CustomerService,
                private orderService: OrderService) { }
    
    async seedProducts() {
        const productNames = ["Keyboard","Mechanical Keyboard","Wireless Keyboard","Ergonomic Keyboard","Gaming Keyboard","Mouse","Wireless Mouse","Gaming Mouse","Vertical Mouse","Trackball Mouse","Mouse Pad","XL Mouse Pad","Wrist Rest","Monitor 24\"","Monitor 27\"","Ultrawide Monitor","4K Monitor","Portable Monitor","Monitor Stand","Monitor Arm","Laptop Stand","Adjustable Laptop Stand","Cooling Pad","Desk Mat","Desk Lamp","LED Desk Lamp","Ring Light","Monitor Light Bar","Webcam","4K Webcam","Webcam Cover","USB Microphone","Podcast Microphone","Headset","Wireless Headset","Noise-Cancelling Headphones","Earbuds","Bluetooth Speaker","Soundbar","USB-C Cable","USB-A to USB-C Cable","USB-C to USB-C Cable","Lightning Cable","HDMI Cable","DisplayPort Cable","Ethernet Cable","Right-Angle USB-C Cable","Cable Organizer","Cable Ties","Velcro Straps","Cable Management Box","USB Hub","Powered USB Hub","USB-C Hub","Docking Station","Thunderbolt Dock","KVM Switch","HDMI Splitter","Capture Card","SD Card","microSD Card","Card Reader","NVMe Enclosure","External SSD","External HDD","SATA Dock","Router","Mesh Wi-Fi System","Network Switch","USB Wi-Fi Adapter","Bluetooth Adapter","Surge Protector","Smart Power Strip","UPS Battery Backup","65W USB-C Charger","100W GaN Charger","Wireless Charger","Power Bank","Phone Stand","Tablet Stand","Stylus","Drawing Tablet","Pen Display","Screen Protector","Laptop Sleeve","Tech Backpack","Smart Plug","Smart Bulb","Smart Hub","Cleaning Gel","Compressed Air","Isopropyl Wipes","Microfiber Cloth","Whiteboard","Label Printer","Thermal Printer","All-in-One Printer","Printer Ink","Toner Cartridge","Foot Rest","Chair Mat"]


        const sampleProducts: ProductEntity[] = productNames.map(name => ({
                name,
                price: Number((Math.random() * Math.random() * 300).toFixed(2)),
                stock: Math.floor(Math.random() * Math.random() * 500)
            } as ProductEntity)
        )

        for (const p of sampleProducts) await this.productService.addProduct(p)
    }

    async seedCustomers() {
        const customerNames = ["Ana","Tom","Maya","Liam","Noah","Emma","Olivia","Ava","Isabella","Sophia","Mia","Amelia","Harper","Evelyn","Abigail","Emily","Ella","Avery","Sofia","Camila","Aria","Scarlett","Victoria","Madison","Luna","Grace","Chloe","Penelope","Layla","Zoey","Nora","Lily","Hannah","Leah","Riley","Lillian","Addison","Aubrey","Eleanor","Stella","Natalie","Zoe","Hazel","Violet","Aurora","Savannah","Brooklyn","Bella","Claire","Skylar","Lucy","Paisley","Everly","Anna","Caroline","Nova","Genesis","Emilia","Kennedy","Samantha","Maya","Will","James","Benjamin","Lucas","Henry","Alexander","Michael","Daniel","Matthew","Jackson","Sebastian","Jack","Aiden","Owen","Samuel","Wyatt","John","David","Joseph","Leo","Luke","Julian","Hudson","Grayson","Levi","Isaac","Gabriel","Lincoln","Anthony","Dylan","Asher","Christopher","Joshua","Andrew","Thomas","Theo","Mateo","Elijah","Ethan","Caleb","Ryan","Nathan","Adrian","Nolan","Miles","Christian"];

        const sampleCustomers: CustomerEntity[] = customerNames.map(name => ({
                name,
                isPremium: Math.random() <= 0.2 ? true : false,
                balance: Number((Math.random() * Math.random() * 10000).toFixed(2))
            } as CustomerEntity)
        )

        for (const c of sampleCustomers) { await this.customerService.addCustomer(c) }
    }

    async createOrder(customerId: number, productIds: number[]) {
        return await AppDataSource.transaction(async (manager) => {
            const customer = await this.customerService.findCustomer(customerId, manager)
            const products = await Promise.all(productIds.map(async pid => await this.productService.findProduct(pid, manager)))
            const order = new OrderEntity()
            order.status = Status.CREATED
            order.customer = customer
            order.items = []
            let total = 0
            for(const product of products) {
                const randomQuantity = 1 + Math.floor(product.stock * Math.random())
                if (product.stock <= 0 || product.stock < randomQuantity) {
                    console.log(`${ product.name } not enough stock!`)
                    continue
                }
                const orderItem = new OrderItemEntity()
                orderItem.order = order
                orderItem.product = product
                orderItem.quantity = randomQuantity
                orderItem.price = product.price
    
                order.items.push(orderItem)
                product.stock -= randomQuantity
                total += Number((orderItem.quantity * orderItem.price).toFixed(2))
                await this.productService.updateProduc({ id: product.id }, { stock: product.stock }, manager)
            }
            if (order.items.length === 0) throw new Error("Order can not be executed, no items...")
            order.total = total
            const finalOrder = await this.orderService.addOrder(order, manager)

            return finalOrder
        })
    }

    async payOrder(order: OrderEntity) {
        if (order.customer.balance < order.total) {
            console.log(`${order.customer.name} does not have enough money 🤷‍♂️`)
            order.status = Status.DECLINED
            await this.orderService.updateOrder({ id: order.id }, { status: order.status })
            return
        }

        order.customer.balance -= order.total
        order.status = Status.PAID
        await this.customerService.updateCustomer({ id: order.customer.id }, { balance: order.customer.balance })
        await this.orderService.updateOrder({ id: order.id }, { status: order.status })
    }

    async summerizeOrder(orderId: number) {
        const order = await this.orderService.findOrder(orderId)
        const orderSummery = Utils.orderSummery(order)

        console.log(`${orderSummery.customerName} order is ${orderSummery.status}, with total of ${orderSummery.total}, containing ${orderSummery.productNames}` + (order.customer.isPremium ? ' with a discount of 20%.' : '.'))
    }
}