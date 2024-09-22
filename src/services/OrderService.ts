import Database from '../db/Database';

class OrderService {
  // Using a private instance of the Database class
  private db = Database.getInstance();

  // Method to create a new order
 public async createOrder(userId: number, cartItems: any[] ,discount: number): Promise<number> {
    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order and retrieve the order ID
    // const [orderResult]: any = await this.db.execute('INSERT INTO Orders (userId, total) VALUES (?, ?)', [userId, total]);
    // const orderId = orderResult.insertId;

    const [orderResult]: any = await this.db.execute('CALL InsertOrder(?, ?,?)', [userId, total,discount]);

// If you want to retrieve the inserted order ID:
    const orderId = orderResult[0][0].orderId;

    // Insert each cart item as an order item
    // for (const item of cartItems) {
    //   await this.db.execute(
    //     'INSERT INTO OrderItems (orderId, productId, productName, productImageUrl, quantity, price,cartid) VALUES (?, ?, ?, ?, ?, ?,?)',
    //     [orderId, item.productId, item.productName, item.productImageUrl, item.quantity, item.price ,item.cartid]
    //   );
    // }

    for (const item of cartItems) {
      await this.db.execute(
        'CALL InsertOrderItem(?, ?, ?, ?, ?, ?, ?)', 
        [orderId, item.productId, item.productName, item.productImageUrl, item.quantity, item.price, item.cartid]
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

  public async getOrdersByUserId(userId: number): Promise<any> {
    try {
      const query = 'CALL GetOrdersByUserId(?)'; // Correctly formatted stored procedure call
      const [rows] = await this.db.execute(query, [userId]); // Pass userId as a parameter
      
      return [rows]; // Return the result directly
    } catch (err) {
      console.error('Error retrieving orders:', err);
      throw new Error('Error retrieving orders');
    }
  }

  public async getAddressByUserId(userId: number): Promise<any> {
    try {
      const query = 'CALL GetAddressByUserId(?)'; // Correctly formatted stored procedure call
      const [rows] = await this.db.execute(query, [userId]); // Pass userId as a parameter
      
      return [rows]; // Return the result directly
    } catch (err) {
      console.error('Error retrieving orders:', err);
      throw new Error('Error retrieving orders');
    }
  }

}




export default new OrderService();
