"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controllers/usercontroller"));
const ClassController_1 = __importDefault(require("../controllers/ClassController"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const CartController_1 = __importDefault(require("../controllers/CartController"));
const multerconfig_1 = __importDefault(require("../config/multerconfig"));
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const PaymentController_1 = __importDefault(require("../controllers/PaymentController"));
const AddressController_1 = __importDefault(require("../controllers/AddressController"));
const otpregController_1 = __importDefault(require("../controllers/otpregController"));
const router = (0, express_1.Router)();
const userController = new usercontroller_1.default();
const productController = new ProductController_1.default();
const cartController = new CartController_1.default();
const orderController = new OrderController_1.default();
const paymentController = new PaymentController_1.default();
const addressController = new AddressController_1.default();
const otpRegController = new otpregController_1.default();
router.post('/signup', userController.signup.bind(userController));
router.post('/otpsignup', otpRegController.signup.bind(otpRegController));
router.post('/verifyOtp', otpRegController.verifyOtp.bind(otpRegController));
router.post('/signin', userController.signin.bind(userController));
router.get('/getproducts', productController.getAllProducts.bind(productController));
router.get('/getTrendingProducts', productController.getTrendingProducts.bind(productController));
router.get('/getOfferProducts', productController.getOfferProducts.bind(productController));
router.post('/searchProducts', productController.searchProducts.bind(productController));
// router.post('/products', upload.single('image'), productController.createProduct.bind(productController));
// Route for creating a product with image upload and token authentication
router.post('/products', AuthMiddleware_1.authenticateJWT, multerconfig_1.default.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), productController.createProduct.bind(productController));
router.post('/class', ClassController_1.default.insertClass);
router.get('/getproductsidbased/:id', productController.getProductById.bind(productController));
router.post('/addtocart', AuthMiddleware_1.authenticateJWT, cartController.addToCart.bind(cartController));
router.post('/getcartsidbased', AuthMiddleware_1.authenticateJWT, cartController.getCartDataById.bind(cartController));
router.post('/removecartsidbased', cartController.removeCartDataById.bind(cartController));
router.post('/addaddress', AuthMiddleware_1.authenticateJWT, addressController.addAddress.bind(addressController));
// Order routes
router.post('/orders', AuthMiddleware_1.authenticateJWT, orderController.createOrder.bind(orderController));
router.get('/orders/:id', AuthMiddleware_1.authenticateJWT, orderController.getOrderById.bind(orderController));
//router.get('/getproductsidbased/:id', productController.getProductById.bind(productController));
// Route to create a payment
router.post('/payments', AuthMiddleware_1.authenticateJWT, paymentController.createPaymentdetails.bind(paymentController));
router.post('/api/payments/create', AuthMiddleware_1.authenticateJWT, paymentController.createPayment.bind(paymentController));
// Route to verify a payment
router.post('/api/payments/verify', AuthMiddleware_1.authenticateJWT, paymentController.verifyPayment.bind(paymentController));
exports.default = router;
