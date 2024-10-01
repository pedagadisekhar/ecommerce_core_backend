"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const User_1 = require("../Models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
class UserService {
    constructor() {
        this.db = Database_1.default.getInstance();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'CALL AddUserDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                user.UserName || null,
                user.email || null,
                user.Password || null,
                user.mobileNo || null,
                user.PANCard || null,
                user.address || null,
                user.profilePic || null,
                user.state || null,
                user.district || null,
                user.pinCode || null,
                user.country || null
            ];
            console.log(user.UserName);
            console.log("vals" + values);
            yield this.db.execute(query, values);
        });
    }
    findUserByName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT UserId, UserName, email, Password FROM userdetails WHERE email = ?';
            // Cast the result to an array of RowDataPacket
            const [rows] = yield this.db.execute(query, [userName]);
            // Type assertion to UserRetrive[] based on the expected structure
            const userRows = rows;
            return userRows.length > 0
                ? new User_1.UserRetrive(userRows[0].UserId, userRows[0].UserName, userRows[0].email, userRows[0].Password)
                : null;
        });
    }
    findUserByMobile(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT UserId, UserName, email, Password FROM userdetails WHERE MobileNo = ?';
            // Cast the result to an array of RowDataPacket
            const [rows] = yield this.db.execute(query, [mobile]);
            // Type assertion to UserRetrive[] based on the expected structure
            const userRows = rows;
            return userRows.length > 0
                ? new User_1.UserRetrive(userRows[0].UserId, userRows[0].UserName, userRows[0].email, userRows[0].Password)
                : null;
        });
    }
    hashPassword(Password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcryptjs_1.default.hash(Password, 10);
            }
            catch (error) {
                console.error('Error hashing password:', error);
                throw error;
            }
        });
    }
    updatePassword(mobile, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE userdetails SET Password = ? WHERE MobileNo = ?';
            const values = [hashedPassword, mobile];
            yield this.db.execute(query, values);
        });
    }
    comparePassword(Password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(Password, hashedPassword);
        });
    }
    // Generate JWT without UserId during signup
    generateJWTWithoutId(username, email) {
        return jsonwebtoken_1.default.sign({ username, email }, jwtSecret, { expiresIn: '1h' });
    }
    // Generate JWT with UserId during sign-in
    generateJWT(userId, username) {
        return jsonwebtoken_1.default.sign({ id: userId, username }, jwtSecret, { expiresIn: '1h' });
    }
}
exports.default = UserService;
