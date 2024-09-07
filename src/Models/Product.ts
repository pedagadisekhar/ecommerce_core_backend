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
      public imageUrl: string | null,
      public image2: string | null,
      public image3: string | null,
      public design: string | null,
      public size: string | null,
      public keyHighlights: string | null,
      public FabricMaterial: string | null,
      public SleeveType: string | null,
      public Fit: string | null,
      public brand: string | null, 
      public NeckStyle: string | null , 
      public isoffer:  number | null,  
      public isfestival:  number | null,  
      public isspecial:  number | null,  
      
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