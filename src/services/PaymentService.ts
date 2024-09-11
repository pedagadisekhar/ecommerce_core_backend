import Razorpay from 'razorpay';
import Database from '../db/Database';
import crypto from 'crypto';

class PaymentService {
  
    private db = Database.getInstance();

    private razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET as string,
      });

      public async createPaymentdetails(orderId: number, userid: number, addressid: number, total: number, paymentMethod: string) {
        try {
          const query = 'CALL AddPaymentDetails(?, ?, ?, ?, ?, ?)';
          const values = [orderId, userid, addressid, total, paymentMethod, 'Pending'];
    
          // Execute the stored procedure
          const [rows]: any = await this.db.execute(query, values);
    
          // Retrieve the paymentId from the result
          const paymentId = rows[0][0]?.paymentId;
    
          return {
            message: 'Payment created successfully',
            paymentId,
            orderId,
            userid,
            addressid,
            total,
            paymentMethod,
            paymentStatus: 'Pending'
          };
        } catch (err) {
          console.error('Error creating payment:', err);
          throw new Error('Error creating payment');
        }
      }

 public async createPayment(orderId: number, amount: number) {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g., paise)
      currency: 'INR',
      receipt: `order_${orderId}`,
    };

    const order = await this.razorpay.orders.create(options);
    return order;
  }

  public async verifyPaymentSignature(paymentDetails: any) {
    const { orderId, paymentId, signature } = paymentDetails;
   const generatedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');

    if (generatedSignature === signature) {
       await this.db.execute('UPDATE Payments SET status = "completed", transactionId = ? WHERE orderId = ?', [paymentId, orderId]);
      return true;
    } else {
       await this.db.execute('UPDATE Payments SET status = "failed" WHERE orderId = ?', [orderId]);
      return false;
    }
  }
}

export default new PaymentService();
