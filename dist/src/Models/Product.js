"use strict";
// src/models/Product.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, description, price, inventory, sku, createdby, istrending, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.inventory = inventory;
        this.sku = sku;
        this.createdby = createdby;
        this.istrending = istrending;
        this.image = image;
    }
}
exports.default = Product;
// export default class GetProduct {
//   constructor(
//     public ProductId: Number,
//     public name: string,
//     public description: string,
//     public price: number,
//     public inventory: number,
//     public sku: string,
//     public createdby: string,
//     public istrending: number,
//     public image: string | null
//   ) {}
// }
