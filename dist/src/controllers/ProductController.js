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
const ProductService_1 = __importDefault(require("../services/ProductService"));
const Product_1 = __importDefault(require("../Models/Product"));
class ProductController {
    constructor() {
        this.productService = new ProductService_1.default();
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, inventory, sku, createdby, istrending } = req.body;
            const imageUrl = req.file ? req.file.path : null;
            try {
                // Assuming the user ID is included in the JWT and set on req.user by the authenticateJWT middleware
                // const userId = req.user; 
                // If you need to associate the product with a user, pass the userId to the Product constructor or service
                const product = new Product_1.default(name, description, parseFloat(price), parseInt(inventory), sku, createdby, istrending, imageUrl || null);
                console.log(product);
                yield this.productService.createProduct(product);
                res.status(201).json({ message: 'Product created successfully' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({
                        message: 'Error creating product',
                        error: err.message
                    });
                }
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = parseInt(req.params.id, 10);
            try {
                const product = yield this.productService.getProductById(productId);
                if (!product) {
                    res.status(404).json({ message: 'Product not found' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (err) {
                res.status(500).json({ message: 'Error fetching product' });
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAllProducts();
                return res.status(200).json(products);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to fetch products' });
            }
        });
    }
    getTrendingProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getTrendingProducts();
                return res.status(200).json(products);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to fetch products' });
            }
        });
    }
}
exports.default = ProductController;
