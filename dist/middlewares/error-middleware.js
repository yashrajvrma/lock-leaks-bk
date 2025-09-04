"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const api_error_1 = __importDefault(require("../utils/api-error"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof api_error_1.default) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
        });
    }
    else if (err instanceof zod_1.ZodError) {
        // Print the first error message from Zod errors
        const firstErrorMessage = err.message.length > 0 ? err.message[0] : "Validation error";
        res.status(400).json({
            success: false,
            message: firstErrorMessage,
            errors: err.issues.map((e) => ({
                path: e.path.join("."), // Join path array to a string if needed
                message: e.message,
            })),
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=error-middleware.js.map