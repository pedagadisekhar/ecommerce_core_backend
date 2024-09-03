// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import Product from '../Models/Product';

class ProductController {
  private productService = new ProductService();



public async createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, inventory, sku ,createdby,istrending} = req.body;
  const imageUrl: string | null = req.file ? req.file.path : null;

  try {
    // Assuming the user ID is included in the JWT and set on req.user by the authenticateJWT middleware
   // const userId = req.user; 

    // If you need to associate the product with a user, pass the userId to the Product constructor or service
    const product = new Product(name, description, parseFloat(price), parseInt(inventory), sku,createdby,istrending,imageUrl || null);
    console.log(product);
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
  

}

export default ProductController;
