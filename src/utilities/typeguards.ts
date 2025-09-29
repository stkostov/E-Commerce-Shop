import { Product } from "../classes/product";

export function isProduct(obj: any): obj is Product {
    return obj && typeof obj.name === "string" && typeof obj.price === "number"
}