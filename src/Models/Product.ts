// src/models/Product.ts

export default class Product {
    constructor(
      
      public name: string,
      public description: string,
      public price: number,
      public inventory: number,
      public sku: string,
      public createdby: string,
      public istrending: number,
      public image: string | null
    ) {}
  }
  

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