import { Request, Response } from 'express';
import PaymentService from '../services/PaymentService';

export default class PaymentController {

  public async createPaymentdetails(req: Request, res: Response): Promise<void> {
    const { orderId, userid, addressid, total, paymentMethod } = req.body;
    console.log(req.body);
    try {
      // Call the service function to handle payment creation
      const payment = await PaymentService.createPaymentdetails(orderId, userid, addressid, total, paymentMethod);
      res.status(200).json(payment);
    } catch (err) {
      console.error('Error creating payment:', err);
      res.status(500).json({ message: 'Error creating payment' });
    }
  }

  public async createPayment(req: Request, res: Response): Promise<void> {
    const { orderId, amount } = req.body;

    try {
      const payment = await PaymentService.createPayment(orderId, amount);
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).json({ message: 'Error creating payment' });
    }
  }

  public async verifyPayment(req: Request, res: Response): Promise<void> {
    const paymentDetails = req.body;

    try {
      const isValid = await PaymentService.verifyPaymentSignature(paymentDetails);

      if (isValid) {
        res.status(200).json({ message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid payment signature' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error verifying payment' });
    }
  }
}
