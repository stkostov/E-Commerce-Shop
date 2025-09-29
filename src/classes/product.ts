export class Product {
    public name: string
    public price: number
    public stock: number

    constructor(name: string, price: number, stock: number = 1) { 
        this.name = name
        this.price = price
        this.stock = stock
    }

    public decreaseStock(amount: number) {
        if (this.stock < amount) throw new Error("Not enough stock to buy")
        this.stock -= amount
    }
    
    public increaseStock(amount: number) {
        if (amount <= 0) throw new Error("Amount must be greater than 0")
        this.stock += amount
    }
}