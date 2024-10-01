import { Router } from 'express';
import UserController from '../controllers/usercontroller';
import ClassController from '../controllers/ClassController';
import ProductController from '../controllers/ProductController';
import CartController  from '../controllers/CartController';
import upload from '../config/multerconfig';
import { authenticateJWT } from '../Middleware/AuthMiddleware';
import OrderController from '../controllers/OrderController';
import PaymentController from '../controllers/PaymentController';
import AddressController from '../controllers/AddressController';
import OtpRegController from '../controllers/otpregController';
import WishListController from '../controllers/WishListController';


const router = Router();
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();
const orderController = new OrderController();
const paymentController = new PaymentController();
const addressController = new AddressController();
const otpRegController = new OtpRegController();
const wishListcontroller = new WishListController();

router.post('/signup', userController.signup.bind(userController));
router.post('/forgetpassword', userController.updatePassword.bind(userController));

router.post('/forgetmsg', otpRegController.forgetpassword.bind(otpRegController));
router.post('/otpsignup', otpRegController.signup.bind(otpRegController));
router.post('/verifyOtp', otpRegController.verifyOtp.bind(otpRegController));


router.post('/signin', userController.signin.bind(userController));
router.get('/getproducts', productController.getAllProducts.bind(productController));
router.get('/getTrendingProducts', productController.getTrendingProducts.bind(productController));
router.get('/getOfferProducts', productController.getOfferProducts.bind(productController));
router.post('/searchProducts', productController.searchProducts.bind(productController));

// router.post('/products', upload.single('image'), productController.createProduct.bind(productController));

// Route for creating a product with image upload and token authentication
router.post('/products', authenticateJWT, 
    upload.fields([
        { name: 'imageUrl', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
      ]), 
    productController.createProduct.bind(productController));

router.post('/class', ClassController.insertClass);
router.get('/getproductsidbased/:id', productController.getProductById.bind(productController));
router.get('/gettrendingproducts', productController.getTrendingProducts.bind(productController));
router.get('/getofferproducts', productController.getOfferProducts.bind(productController));

router.post('/addtocart', authenticateJWT, cartController.addToCart.bind(cartController));
router.post('/getcartsidbased', authenticateJWT, cartController.getCartDataById.bind(cartController));
router.post('/removecartsidbased', cartController.removeCartDataById.bind(cartController));
router.post('/getCartDatacountById', cartController.getCartDatacountById.bind(cartController));

router.post('/addtowishlist', authenticateJWT, wishListcontroller.addToWishList.bind(cartController));
router.post('/getwishlistidbased', authenticateJWT, wishListcontroller.getWishListDataById.bind(cartController));
router.post('/removewishlistidbased', wishListcontroller.removeWishListDataById.bind(cartController));
router.post('/getwishlistDatacountById',authenticateJWT, wishListcontroller.getWishListDatacountById.bind(cartController));


router.post('/addaddress', authenticateJWT, addressController.addAddress.bind(addressController));

// Order routes
router.post('/orders', authenticateJWT, orderController.createOrder.bind(orderController));
router.get('/orders/:id', authenticateJWT, orderController.getOrderById.bind(orderController));
router.post('/myorders', authenticateJWT, orderController.getOrdersByUserId.bind(orderController));

//router.get('/getproductsidbased/:id', productController.getProductById.bind(productController));

// Route to create a payment
router.post('/payments', authenticateJWT, paymentController.createPaymentdetails.bind(paymentController));


router.post('/api/payments/create', authenticateJWT, paymentController.createPayment.bind(paymentController));

// Route to verify a payment
router.post('/api/payments/verify', authenticateJWT, paymentController.verifyPayment.bind(paymentController));


export default router;
