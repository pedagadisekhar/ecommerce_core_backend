"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const multerconfig_1 = __importDefault(require("../config/multerconfig"));
const router = (0, express_1.Router)();
const productController = new ProductController_1.default();
// Route for creating a product with image upload
router.post('/products', multerconfig_1.default.single('image'), productController.createProduct.bind(productController));
exports.default = router;
