"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = promise_1.default.createPool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || 'Mysql@7416',
                database: process.env.DB_NAME || 'project1',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
        }
        return Database.instance;
    }
}
exports.default = Database;
