"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
// Load SSL certificate and key
const sslKeyPath = path_1.default.resolve(__dirname, './certs/key.pem');
const sslCertPath = path_1.default.resolve(__dirname, './certs/cert.pem');
const options = {
    key: fs_1.default.readFileSync(sslKeyPath),
    cert: fs_1.default.readFileSync(sslCertPath)
};
// Create an HTTPS server
https_1.default.createServer(options, app_1.default).listen(port, () => {
    console.log(`Secure server running on https://localhost:${port}`);
});
