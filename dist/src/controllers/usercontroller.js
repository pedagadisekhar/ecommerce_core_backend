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
const userservice_1 = __importDefault(require("../services/userservice"));
const User_1 = __importDefault(require("../Models/User"));
class UserController {
    constructor() {
        this.userService = new userservice_1.default();
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { UserName, email, Password, address, mobileNo, PANCard, profilePic, state, district, pinCode, country } = req.body;
            console.log(req.body);
            try {
                const hashedPassword = yield this.userService.hashPassword(Password);
                console.log(hashedPassword);
                const user = new User_1.default(UserName, email, hashedPassword, address, mobileNo, PANCard, profilePic, state, district, pinCode, country);
                yield this.userService.createUser(user);
                const token = this.userService.generateJWTWithoutId(user.UserName, user.email);
                console.log(user);
                res.status(201).json({ message: 'User created', token });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: 'Error creating user', error: err.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred' });
                }
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, Password } = req.body;
            try {
                const user = yield this.userService.findUserByName(email);
                if (!user) {
                    res.status(401).json({ message: 'Invalid username or password' });
                    return;
                }
                const isValid = yield this.userService.comparePassword(Password, user.Password);
                if (isValid) {
                    const token = this.userService.generateJWT(user.UserId, user.UserName);
                    res.status(200).json({ message: "Success", token, UserId: user.UserId });
                }
                else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = UserController;
