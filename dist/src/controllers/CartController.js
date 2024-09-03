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
const CartService_1 = __importDefault(require("../services/CartService"));
class CartController {
    constructor() {
        this.cartService = new CartService_1.default();
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body); // Log the request body to verify incoming data
                const { userId, productId, quantity } = req.body;
                // Add the product to the cart using the cartService
                yield this.cartService.addProductToCart(userId, productId, quantity);
                // Send a success response
                res.status(200).json({ message: 'Product added to cart' });
            }
            catch (err) {
                // Check if the error is an instance of Error
                if (err instanceof Error) {
                    // Log the error message for debugging purposes
                    console.log(err.message);
                    // Send an error response with the error message
                    res.status(500).json({
                        message: 'Error adding product to cart',
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
    getCartDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const userId = parseInt(req.params.id, 10);
            const { userId } = req.body;
            try {
                const product = yield this.cartService.getCartDataById(userId);
                if (!product) {
                    res.status(404).json({ message: 'cart data not found' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (err) {
                res.status(500).json({ message: 'Error fetching product' });
            }
        });
    }
    removeCartDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const userId = parseInt(req.params.id, 10);
            const { cartid } = req.body;
            try {
                const product = yield this.cartService.removeCartDataById(cartid);
                if (!product) {
                    res.status(404).json({ message: 'cart data not found' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (err) {
                res.status(500).json({ message: 'Error fetching product' });
            }
        });
    }
}
exports.default = CartController;
