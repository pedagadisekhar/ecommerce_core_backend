import { Request, Response } from 'express';
import AddressService from '../services/AddressService';

export default class AddressController {
    public async addAddress(req: Request, res: Response): Promise<void> {
        const { userId, address, orderId } = req.body;
      
        try {
          await AddressService.addAddress(userId, address ,orderId);
          res.status(200).json({ message: 'Address added successfully' });
        } catch (err) {
          if (err instanceof Error) {
            // Log the error message for debugging purposes
            console.error(err.message);
      
            // Send an error response with the error message
            res.status(500).json({
              message: 'Error adding address',
              error: err.message
            });
          } else {
            // Handle cases where err is not an instance of Error
            console.error('Unexpected error:', err);
            res.status(500).json({
              message: 'Unexpected error occurred while adding address'
            });
          }
        }
      }
}
