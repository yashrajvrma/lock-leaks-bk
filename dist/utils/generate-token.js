"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const api_error_1 = __importDefault(require("./api-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = async (data) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1hr";
    if (!accessTokenSecret) {
        throw new api_error_1.default(500, "Internal server error: access token secret not set");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: data.id,
        email: data.email,
    }, accessTokenSecret, {
        expiresIn: accessTokenExpiry,
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = async ({ id }) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
    if (!refreshTokenSecret) {
        throw new api_error_1.default(500, "Internal server error: refresh token secret not set");
    }
    const refreshToken = jsonwebtoken_1.default.sign({
        id,
    }, refreshTokenSecret, {
        expiresIn: refreshTokenExpiry,
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generate-token.js.map