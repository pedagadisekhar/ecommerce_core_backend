"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
class OrderService {
    constructor() {
        // Using a private instance of the Database class
        this.db = Database_1.default.getInstance();
    }
    // Method to create a new order
    createOrder(userId, cartItems, discount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Calculate the total price
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            // Create a new order and retrieve the order ID
            // const [orderResult]: any = await this.db.execute('INSERT INTO Orders (userId, total) VALUES (?, ?)', [userId, total]);
            // const orderId = orderResult.insertId;
            const [orderResult] = yield this.db.execute('CALL InsertOrder(?, ?,?)', [userId, total, discount]);
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
                yield this.db.execute('CALL InsertOrderItem(?, ?, ?, ?, ?, ?, ?)', [orderId, item.productId, item.productName, item.productImageUrl, item.quantity, item.price, item.cartid]);
            }
            return orderId;
        });
    }
    // Method to get order details by order ID
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the order details
            const [resultSets] = yield this.db.query('CALL GetOrderDetails(?)', [orderId]);
            // The first result set contains the order data (Orders table)
            const orderRows = resultSets[0]; // First result set (Orders)
            const order = orderRows[0]; // Assuming only one order is returned
            // The second result set contains the items data (OrderItems table)
            const items = resultSets[1]; // Second result set (OrderItems)
            // The third result set contains the address data (AddressMaster table)
            const address = resultSets[2]; // Third result set (AddressMaster)
            // You can now work with the `order`, `items`, and `address` data
            console.log("Order:", order);
            console.log("Items:", items);
            console.log("Address:", address);
            return { order, items, address };
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'CALL GetOrdersByUserId(?)'; // Correctly formatted stored procedure call
                const [rows] = yield this.db.execute(query, [userId]); // Pass userId as a parameter
                return [rows]; // Return the result directly
            }
            catch (err) {
                console.error('Error retrieving orders:', err);
                throw new Error('Error retrieving orders');
            }
        });
    }
    getAddressByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'CALL GetAddressByUserId(?)'; // Correctly formatted stored procedure call
                const [rows] = yield this.db.execute(query, [userId]); // Pass userId as a parameter
                return [rows]; // Return the result directly
            }
            catch (err) {
                console.error('Error retrieving orders:', err);
                throw new Error('Error retrieving orders');
            }
        });
    }
}
exports.default = new OrderService();
