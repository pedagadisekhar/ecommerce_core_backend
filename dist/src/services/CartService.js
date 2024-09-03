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
class CartService {
    constructor() {
        this.db = Database_1.default.getInstance();
    }
    addProductToCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'CALL AddProductToCart(?, ?, ?)';
            const [result] = yield this.db.execute(query, [userId, productId, quantity]);
            // Optionally, handle the result if needed
            // For example, check if the operation was successful
            console.log(result);
        });
    }
    getCartDataById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            //const query = 'select * from carttransactiontable where userid  = ?';
            const query = 'call getdatafromcart(?)';
            const [rows] = yield this.db.query(query, [userId]);
            // Assuming rows is an array of results
            if ([rows].length > 0) {
                const productData = rows[0];
                return productData;
            }
            return null;
        });
    }
    removeCartDataById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            //const query = 'select * from carttransactiontable where userid  = ?';
            const query = 'call removedatafromcart(?)';
            const [rows] = yield this.db.query(query, [cartId]);
            // Assuming rows is an array of results
            if ([rows].length > 0) {
                const productData = rows[0];
                return productData;
            }
            return null;
        });
    }
}
exports.default = CartService;
