
import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import upload from '../config/multerconfig';

const router = Router();
const productController = new ProductController();

// Route for creating a product with image upload
router.post('/products', upload.single('image'), productController.createProduct.bind(productController));

export default router;
