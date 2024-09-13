import { Request, Response } from 'express';
import  CartService  from '../services/CartService';
import jwt from 'jsonwebtoken';

export default class CartController {

  // private cartService = new CartService();
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }
 

  public async addToCart(req: Request, res: Response): Promise<void> {
    try {
        console.log(req.body); // Log the request body to verify incoming data

        const { userId, productId, quantity,size } = req.body;

        // Add the product to the cart using the cartService
        await this.cartService.addProductToCart(userId, productId, quantity,size);

        // Send a success response
        res.status(200).json({ message: 'Product added to cart' });

    } catch (err) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
            // Log the error message for debugging purposes
            console.log(err.message);

            // Send an error response with the error message
            res.status(500).json({
                message: 'Error adding product to cart',
                error: err.message
               
            });
        } else {
            // Handle cases where err is not an instance of Error
            console.log('Unexpected error:', err);
            res.status(500).json({
                message: 'Unexpected error occurred while adding product to cart'
            });
        }
    }
}


  public async getCartDataById(req: Request, res: Response): Promise<void> {
    //const userId = parseInt(req.params.id, 10);
    const { userId } = req.body;

    try {
      const product = await this.cartService.getCartDataById(userId);
  
      if (!product) {
        res.status(404).json({ message: 'cart data not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  }
  
  public async removeCartDataById(req: Request, res: Response): Promise<void> {
    //const userId = parseInt(req.params.id, 10);
    const { cartid } = req.body;

    try {
      const product = await this.cartService.removeCartDataById(cartid);
  
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
