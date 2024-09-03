import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export default class OrderController {
  public async createOrder(req: Request, res: Response): Promise<void> {
    const { userId, cartItems } = req.body;

    try {
      const orderId = await OrderService.createOrder(userId, cartItems);
      res.status(200).json({ message: 'Order created successfully', orderId });
    }    catch (err) {
      // Check if the error is an instance of Error
      if (err instanceof Error) {
          // Log the error message for debugging purposes
          console.log(err.message);
          // Send an error response with the error message
          res.status(500).json({
              message: 'Error adding order',
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
    // catch (err) {
    //   res.status(500).json({ message: 'Error creating order' });
    // }
  }

  public async getOrderById(req: Request, res: Response): Promise<void> {
    const orderId = parseInt(req.params.id, 10);
    try {
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching order' });
    }
  }
}
