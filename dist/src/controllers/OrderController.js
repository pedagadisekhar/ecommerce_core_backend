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
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, cartItems } = req.body;
            try {
                const orderId = yield OrderService_1.default.createOrder(userId, cartItems);
                res.status(200).json({ message: 'Order created successfully', orderId });
            }
            catch (err) {
                // Check if the error is an instance of Error
                if (err instanceof Error) {
                    // Log the error message for debugging purposes
                    console.log(err.message);
                    // Send an error response with the error message
                    res.status(500).json({
                        message: 'Error adding order',
                        error: err.message
                    });
                }
                else {
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
        });
    }
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = parseInt(req.params.id, 10);
            try {
                const order = yield OrderService_1.default.getOrderById(orderId);
                if (!order) {
                    res.status(404).json({ message: 'Order not found' });
                    return;
                }
                res.status(200).json(order);
            }
            catch (err) {
                // res.status(500).json({ message: 'Error fetching order' });
                if (err instanceof Error) {
                    // Log the error message for debugging purposes
                    console.log(err.message);
                    // Send an error response with the error message
                    res.status(500).json({
                        message: 'Error fetching order',
                        error: err.message
                    });
                }
                else {
                    // Handle cases where err is not an instance of Error
                    console.log('Unexpected error:', err);
                    res.status(500).json({
                        message: 'Unexpected error occurred while adding product to cart'
                    });
                }
            }
        });
    }
    getOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const order = yield OrderService_1.default.getOrdersByUserId(userId);
                if (!order) {
                    res.status(404).json({ message: 'Order not found' });
                    return;
                }
                res.status(200).json(order);
            }
            catch (err) {
                // res.status(500).json({ message: 'Error fetching order' });
                if (err instanceof Error) {
                    // Log the error message for debugging purposes
                    console.log(err.message);
                    // Send an error response with the error message
                    res.status(500).json({
                        message: 'Error fetching order',
                        error: err.message
                    });
                }
                else {
                    // Handle cases where err is not an instance of Error
                    console.log('Unexpected error:', err);
                    res.status(500).json({
                        message: 'Unexpected error occurred while adding product to cart'
                    });
                }
            }
        });
    }
    getAddressByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const order = yield OrderService_1.default.getAddressByUserId(userId);
                if (!order) {
                    res.status(404).json({ message: 'Order not found' });
                    return;
                }
                res.status(200).json(order);
            }
            catch (err) {
                // res.status(500).json({ message: 'Error fetching order' });
                if (err instanceof Error) {
                    // Log the error message for debugging purposes
                    console.log(err.message);
                    // Send an error response with the error message
                    res.status(500).json({
                        message: 'Error fetching order',
                        error: err.message
                    });
                }
                else {
                    // Handle cases where err is not an instance of Error
                    console.log('Unexpected error:', err);
                    res.status(500).json({
                        message: 'Unexpected error occurred while adding product to cart'
                    });
                }
            }
        });
    }
}
exports.default = OrderController;
