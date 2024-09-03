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
const Database_1 = __importDefault(require("../db/Database"));
const GetProduct_1 = __importDefault(require("../Models/GetProduct"));
class ProductService {
    constructor() {
        this.db = Database_1.default.getInstance();
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM products';
            const [rows] = yield this.db.execute(query);
            return rows;
        });
    }
    getTrendingProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'CALL GetTrendingProducts()';
            const [rows] = yield this.db.execute(query);
            return rows;
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO products (ProductName, description, price, inventory, sku, imageUrl,istrending,createdby)
      VALUES (?, ?, ?, ?, ?, ?,?,?)
    `;
            const values = [
                product.name,
                product.description,
                product.price,
                product.inventory,
                product.sku,
                product.image,
                product.istrending,
                product.createdby
            ];
            yield this.db.execute(query, values);
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM products WHERE ProductId = ?';
            const [rows] = yield this.db.query(query, [productId]);
            const productData = rows[0];
            return new GetProduct_1.default(productData.ProductId, productData.name, productData.description, productData.price, productData.inventory, productData.sku, productData.createdby, // Include 'createdby'
            productData.istrending, // Include 'istrending'
            productData.imageUrl // Ensure 'image' is the correct field from the database
            );
            return null;
        });
    }
}
exports.default = ProductService;
