// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import Product from '../Models/Product';

class ProductController {
  private productService = new ProductService();


  public async createProduct(req: Request, res: Response): Promise<void> {
    const { 
      name, description, price, inventory, sku, createdby, istrending, design, size, keyHighlights, FabricMaterial, SleeveType, Fit, brand, NeckStyle, isoffer, isfestival, isspecial 
    } = req.body;
    
    // Handle image file uploads
    const imageUrl: string | null = req.files && req.files['imageUrl'] ? req.files['imageUrl'][0].path : null;
    const image2: string | null = req.files && req.files['image2'] ? req.files['image2'][0].path : null;
    const image3: string | null = req.files && req.files['image3'] ? req.files['image3'][0].path : null;
  
    try {
      const product = new Product(
        name, 
        description, 
        parseFloat(price), 
        parseInt(inventory), 
        sku, 
        createdby, 
        istrending, 
        imageUrl || null, 
        image2 || null, 
        image3 || null,
        design || null,
        size || null,
        keyHighlights || null,
        FabricMaterial || null,
        SleeveType || null,
        Fit || null,
        brand || null,
        NeckStyle || null,
        isoffer || null,
        isfestival || null,
        isspecial || null
      );
      
      await this.productService.createProduct(product);
      res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({
          message: 'Error creating product',
          error: err.message
        });
      }
    }
  }
  
public async getProductById(req: Request, res: Response): Promise<void> {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await this.productService.getProductById(productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
}

  public async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  
  
  public async getTrendingProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getTrendingProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  public async searchProducts(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.body; // Expecting a keyword from the request body
    
    try {
        const products = await this.productService.searchProductsByKeyword(keyword);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        return res.status(500).json({ message: 'Failed to fetch products' });
    }
}

  
  public async getOfferProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getOfferProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

}

export default ProductController;
