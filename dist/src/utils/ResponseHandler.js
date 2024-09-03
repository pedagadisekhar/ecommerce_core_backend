"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static success(res, data) {
        res.status(200).json({
            status: 'success',
            data
        });
    }
    static error(res, message) {
        res.status(500).json({
            status: 'error',
            message
        });
    }
}
exports.default = ResponseHandler;
