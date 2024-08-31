import { Request, Response } from 'express';
import PaymentService from '../services/PaymentService';

export default class PaymentController {
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
