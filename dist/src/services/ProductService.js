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
    searchProductsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CALL SearchProductsByKeyword(?)`; // Call the stored procedure
            const values = [keyword]; // Pass the keyword as a parameter
            try {
                const [rows] = yield this.db.execute(query, values);
                return rows[0]; // Use rows[0] because stored procedures return results as an array of arrays
            }
            catch (error) {
                console.error('Error executing search query:', error);
                throw new Error('Failed to search products');
            }
        });
    }
    getOfferProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'CALL getOfferProducts()';
            const [rows] = yield this.db.execute(query);
            return rows;
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO products 
    (ProductName, description, price, inventory, sku, imageUrl, istrending, createdby, image2, image3, design, size, keyHighlights, FabricMaterial, SleeveType, Fit, brand, NeckStyle, isoffer, isfestival, isspecial)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
            const values = [
                product.name,
                product.description,
                product.price,
                product.inventory,
                product.sku,
                product.imageUrl,
                product.istrending,
                product.createdby,
                product.image2,
                product.image3,
                product.design,
                product.size,
                product.keyHighlights,
                product.FabricMaterial,
                product.SleeveType,
                product.Fit,
                product.brand,
                product.NeckStyle,
                product.isoffer,
                product.isfestival,
                product.isspecial
            ];
            yield this.db.execute(query, values);
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM products WHERE ProductId = ?';
            const [rows] = yield this.db.query(query, [productId]);
            // If no product is found, return null
            // if (rows.length === 0) {
            //     return null;
            // }
            // Return the raw data directly
            return rows[0];
        });
    }
}
exports.default = ProductService;
