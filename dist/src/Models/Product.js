"use strict";
// src/models/Product.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, description, price, inventory, sku, createdby, istrending, imageUrl, image2, image3, design, size, keyHighlights, FabricMaterial, SleeveType, Fit, brand, NeckStyle, isoffer, isfestival, isspecial) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.inventory = inventory;
        this.sku = sku;
        this.createdby = createdby;
        this.istrending = istrending;
        this.imageUrl = imageUrl;
        this.image2 = image2;
        this.image3 = image3;
        this.design = design;
        this.size = size;
        this.keyHighlights = keyHighlights;
        this.FabricMaterial = FabricMaterial;
        this.SleeveType = SleeveType;
        this.Fit = Fit;
        this.brand = brand;
        this.NeckStyle = NeckStyle;
        this.isoffer = isoffer;
        this.isfestival = isfestival;
        this.isspecial = isspecial;
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
