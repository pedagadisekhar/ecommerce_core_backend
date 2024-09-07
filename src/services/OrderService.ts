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
 public async getOrderById(orderId: number): Promise<{ order: any; items: any[]; address: any[] }> {
    // Retrieve the order details
    const [resultSets]: any = await this.db.query('CALL GetOrderDetails(?)', [orderId]);

// The first result set contains the order data (Orders table)
const orderRows = resultSets[0];  // First result set (Orders)
const order = orderRows[0];       // Assuming only one order is returned

// The second result set contains the items data (OrderItems table)
const items = resultSets[1];      // Second result set (OrderItems)

// The third result set contains the address data (AddressMaster table)
const address = resultSets[2];    // Third result set (AddressMaster)

// You can now work with the `order`, `items`, and `address` data
console.log("Order:", order);
console.log("Items:", items);
console.log("Address:", address);
    return { order, items ,address};
  }
}

export default new OrderService();
