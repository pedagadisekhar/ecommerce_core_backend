import Database from '../db/Database';

class OrderService {
  // Using a private instance of the Database class
  private db = Database.getInstance();

  // Method to create a new order
 public async createOrder(userId: number, cartItems: any[]): Promise<number> {
    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order and retrieve the order ID
    const [orderResult]: any = await this.db.execute('INSERT INTO Orders (userId, total) VALUES (?, ?)', [userId, total]);
    const orderId = orderResult.insertId;

    // Insert each cart item as an order item
    for (const item of cartItems) {
      await this.db.execute(
        'INSERT INTO OrderItems (orderId, productId, productName, productImageUrl, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, item.productId, item.productName, item.productImageUrl, item.quantity, item.price]
      );
    }

    return orderId;
  }

  // Method to get order details by order ID
 public async getOrderById(orderId: number): Promise<{ order: any; items: any[] }> {
    // Retrieve the order details
    const [orderRows]: any = await this.db.query('SELECT * FROM Orders WHERE id = ?', [orderId]);
    const order = orderRows[0];

    // Retrieve the items associated with the order
    const [items]: any = await this.db.query('SELECT * FROM OrderItems WHERE orderId = ?', [orderId]);

    return { order, items };
  }
}

export default new OrderService();
