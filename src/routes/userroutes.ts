import { Router } from 'express';
import UserController from '../controllers/usercontroller';
import ClassController from '../controllers/ClassController';
import ProductController from '../controllers/ProductController';
import CartController  from '../controllers/CartController';
import upload from '../config/multerconfig';
import { authenticateJWT } from '../Middleware/AuthMiddleware';
import OrderController from '../controllers/OrderController';
import PaymentController from '../controllers/PaymentController';

const router = Router();
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();
const orderController = new OrderController();
const paymentController = new PaymentController();


router.post('/signup', userController.signup.bind(userController));
router.post('/signin', userController.signin.bind(userController));
router.get('/getproducts', productController.getAllProducts.bind(productController));
router.get('/getTrendingProducts', productController.getTrendingProducts.bind(productController));

// router.post('/products', upload.single('image'), productController.createProduct.bind(productController));

// Route for creating a product with image upload and token authentication
router.post('/products', authenticateJWT, upload.single('imageUrl'), productController.createProduct.bind(productController));

router.post('/class', ClassController.insertClass);
router.get('/getproductsidbased/:id', productController.getProductById.bind(productController));
router.post('/addtocart', authenticateJWT, cartController.addToCart.bind(CartController));
router.post('/getcartsidbased/:id', authenticateJWT, cartController.getCartDataById.bind(CartController));
// Order routes
router.post('/api/orders/create', authenticateJWT, orderController.createOrder.bind(orderController));
router.get('/api/orders/:id', authenticateJWT, orderController.getOrderById.bind(orderController));
// Route to create a payment
router.post('/api/payments/create', authenticateJWT, paymentController.createPayment.bind(paymentController));

// Route to verify a payment
router.post('/api/payments/verify', authenticateJWT, paymentController.verifyPayment.bind(paymentController));


export default router;
