"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProduct {
    constructor(ProductId, name, description, price, inventory, sku, createdby, istrending, image) {
        this.ProductId = ProductId;
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
exports.default = GetProduct;
