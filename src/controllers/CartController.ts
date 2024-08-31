import { Request, Response } from 'express';
import  CartService  from '../services/CartService';
import jwt from 'jsonwebtoken';

export default class CartController {

   private cartService = new CartService();

 

  public async addToCart(req: Request, res: Response): Promise<void> {
    const { userId, productId, quantity } = req.body;

    try {
      // Verify JWT and get the user ID from the token
    //   const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    //   const userId = decoded.id;

      await this.cartService.addProductToCart(userId, productId, quantity);
      res.status(200).json({ message: 'Product added to cart' });

    } catch (err) {
      res.status(500).json({
        message: 'Error adding product to cart'
        //,error: err.message
      });
    }
  }

  public async getCartDataById(req: Request, res: Response): Promise<void> {
    const productId = parseInt(req.params.id, 10);
  
    try {
      const product = await this.cartService.getCartDataById(productId);
  
      if (!product) {
        res.status(404).json({ message: 'cart data not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  }

}
