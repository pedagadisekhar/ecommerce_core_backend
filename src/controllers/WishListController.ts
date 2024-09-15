import { Request, Response } from 'express';
import  WishListService  from '../services/WishListService';
import jwt from 'jsonwebtoken';

export default class WishListController {

  // private cartService = new CartService();
  private wishlistService: WishListService;

  constructor() {
    this.wishlistService = new WishListService();
  }
 

  public async addToWishList(req: Request, res: Response): Promise<void> {
    try {
        console.log(req.body); // Log the request body to verify incoming data

        const { userId, productId, quantity,size } = req.body;

        // Add the product to the cart using the cartService
        await this.wishlistService.addToWishList(userId, productId, quantity,size);

        // Send a success response
        res.status(200).json({ message: 'wishlist added to cart' });

    } catch (err) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
            // Log the error message for debugging purposes
            console.log(err.message);

            // Send an error response with the error message
            res.status(500).json({
                message: 'Error adding product to wishlist',
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


  public async getWishListDataById(req: Request, res: Response): Promise<void> {
    //const userId = parseInt(req.params.id, 10);
    const { userId } = req.body;

    try {
      const product = await this.wishlistService.getWishListDataById(userId);
  
      if (!product) {
        res.status(404).json({ message: 'wishlist data not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  }
  
  public async removeWishListDataById(req: Request, res: Response): Promise<void> {
    //const userId = parseInt(req.params.id, 10);
    const { cartid } = req.body;

    try {
      const product = await this.wishlistService.removeWishListDataById(cartid);
  
      if (!product) {
        res.status(404).json({ message: 'cart data not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  }
  

  

  public async getWishListDatacountById(req: Request, res: Response): Promise<void> {
    //const userId = parseInt(req.params.id, 10);
    const { userId } = req.body;

    try {
      const product = await this.wishlistService.getWishListDatacountById(userId);
  
      if (!product) {
        res.status(404).json({ message: 'wishlist data not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  }



}
