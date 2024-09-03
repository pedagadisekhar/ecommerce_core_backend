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
const razorpay_1 = __importDefault(require("razorpay"));
const Database_1 = __importDefault(require("../db/Database"));
const crypto_1 = __importDefault(require("crypto"));
class PaymentService {
    constructor() {
        this.db = Database_1.default.getInstance();
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    createPayment(orderId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                amount: amount * 100, // amount in the smallest currency unit (e.g., paise)
                currency: 'INR',
                receipt: `order_${orderId}`,
            };
            const order = yield this.razorpay.orders.create(options);
            return order;
        });
    }
    verifyPaymentSignature(paymentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, paymentId, signature } = paymentDetails;
            const generatedSignature = crypto_1.default
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${orderId}|${paymentId}`)
                .digest('hex');
            if (generatedSignature === signature) {
                yield this.db.execute('UPDATE Payments SET status = "completed", transactionId = ? WHERE orderId = ?', [paymentId, orderId]);
                return true;
            }
            else {
                yield this.db.execute('UPDATE Payments SET status = "failed" WHERE orderId = ?', [orderId]);
                return false;
            }
        });
    }
}
exports.default = new PaymentService();
