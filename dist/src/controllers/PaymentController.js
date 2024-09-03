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
const PaymentService_1 = __importDefault(require("../services/PaymentService"));
class PaymentController {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, amount } = req.body;
            try {
                const payment = yield PaymentService_1.default.createPayment(orderId, amount);
                res.status(200).json(payment);
            }
            catch (err) {
                res.status(500).json({ message: 'Error creating payment' });
            }
        });
    }
    verifyPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentDetails = req.body;
            try {
                const isValid = yield PaymentService_1.default.verifyPaymentSignature(paymentDetails);
                if (isValid) {
                    res.status(200).json({ message: 'Payment verified successfully' });
                }
                else {
                    res.status(400).json({ message: 'Invalid payment signature' });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'Error verifying payment' });
            }
        });
    }
}
exports.default = PaymentController;
