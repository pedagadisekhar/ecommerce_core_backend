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
    createOrder(userId, cartItems) {
        return __awaiter(this, void 0, void 0, function* () {
            // Calculate the total price
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            // Create a new order and retrieve the order ID
            const [orderResult] = yield this.db.execute('INSERT INTO Orders (userId, total) VALUES (?, ?)', [userId, total]);
            const orderId = orderResult.insertId;
            // Insert each cart item as an order item
            for (const item of cartItems) {
                yield this.db.execute('INSERT INTO OrderItems (orderId, productId, productName, productImageUrl, quantity, price) VALUES (?, ?, ?, ?, ?, ?)', [orderId, item.productId, item.productName, item.productImageUrl, item.quantity, item.price]);
            }
            return orderId;
        });
    }
    // Method to get order details by order ID
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the order details
            const [orderRows] = yield this.db.query('SELECT * FROM Orders WHERE id = ?', [orderId]);
            const order = orderRows[0];
            // Retrieve the items associated with the order
            const [items] = yield this.db.query('SELECT * FROM OrderItems WHERE orderId = ?', [orderId]);
            return { order, items };
        });
    }
}
exports.default = new OrderService();
