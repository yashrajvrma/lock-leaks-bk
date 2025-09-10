"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.signUp = exports.signIn = void 0;
const auth_schema_1 = require("../../schema/auth-schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_config_1 = __importDefault(require("../../config/db-config"));
const generate_token_1 = require("../../utils/generate-token");
const api_response_1 = __importDefault(require("../../utils/api-response"));
const index_1 = require("../../utils/constant/index");
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = __importDefault(require("../../utils/api-error"));
exports.signIn = (0, async_handler_1.default)(async (req, res) => {
    console.log("BODY =>", req.body);
    const { email, password } = auth_schema_1.userSignInSchema.parse(req.body);
    console.log(email, password);
    if (!email) {
        throw new api_error_1.default(400, "Email  is required");
    }
    if (!password) {
        throw new api_error_1.default(400, "Password is required");
    }
    const isValidUser = await db_config_1.default.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });
    if (!isValidUser) {
        throw new api_error_1.default(400, `No account found with ${email}`);
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, isValidUser.password);
    if (!isPasswordCorrect) {
        throw new api_error_1.default(400, "Invalid Password");
    }
    const accessToken = await (0, generate_token_1.generateAccessToken)({
        id: isValidUser.id,
        email: isValidUser.email,
    });
    const refreshToken = await (0, generate_token_1.generateRefreshToken)({
        id: isValidUser.id,
    });
    await db_config_1.default.user.update({
        where: {
            id: isValidUser.id,
        },
        data: {
            refreshToken,
        },
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 1000,
    });
    return res.json(new api_response_1.default(200, {
        email: isValidUser.email,
        accessToken: accessToken,
    }));
});
exports.signUp = (0, async_handler_1.default)(async (req, res) => {
    const { pricingName, billed, platform, username, email, password, contactWhatsappNumber, contactPhoneNumber, contactEmail, contactLiveChat, } = auth_schema_1.userSignUpSchema.parse(req.body);
    const platformData = {
        platform,
        username,
    };
    if (contactWhatsappNumber)
        platformData.contactWhatsappNumber = contactWhatsappNumber;
    if (contactEmail)
        platformData.contactEmail = contactEmail;
    if (contactPhoneNumber)
        platformData.contactPhoneNumber = contactPhoneNumber;
    if (contactLiveChat)
        platformData.contactLiveChat = contactLiveChat;
    const isExistingUser = await db_config_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (isExistingUser) {
        throw new api_error_1.default(400, `User already exists with Mobile no ${email}`);
    }
    const pricing = await db_config_1.default.pricing.findFirst({
        where: {
            name: pricingName,
            billed: billed,
        },
    });
    if (!pricing) {
        throw new api_error_1.default(400, "Pricing details is required");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, index_1.saltRounds);
    const newUser = await db_config_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            priceId: pricing.id,
        },
    });
    const createPlatform = await db_config_1.default.platform.create({
        data: platformData,
    });
    const accessToken = await (0, generate_token_1.generateAccessToken)({
        id: newUser.id,
        email: newUser.email,
    });
    const refreshToken = await (0, generate_token_1.generateRefreshToken)({
        id: newUser.id,
    });
    await db_config_1.default.user.update({
        where: {
            id: newUser.id,
        },
        data: {
            refreshToken,
            platformId: createPlatform.id,
        },
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json(new api_response_1.default(200, {
        id: newUser.id,
        email: newUser.email,
        pricing: {
            tier: pricing.name,
        },
        platform: {
            id: createPlatform.id,
            platform: createPlatform.platform,
            username: createPlatform.username,
            contactWhatsappNumber: createPlatform.contactWhatsappNumber ?? "",
            contactPhoneNumber: createPlatform.contactPhoneNumber ?? "",
            contactLiveChat: createPlatform.contactLiveChat,
            contactEmail: createPlatform.contactEmail,
        },
        accessToken,
    }, "User creaated successfully"));
});
exports.refreshAccessToken = (0, async_handler_1.default)(async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        throw new api_error_1.default(401, "Unauthorised request");
    }
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const decodedToken = jsonwebtoken_1.default.verify(token, refreshTokenSecret);
    if (!decodedToken || !decodedToken.id) {
        throw new api_error_1.default(400, "Invalid refresh token");
    }
    console.log("decode data is", JSON.stringify(decodedToken));
    const user = await db_config_1.default.user.findUnique({
        where: {
            id: decodedToken.id,
        },
    });
    if (!user) {
        throw new api_error_1.default(400, "User not found");
    }
    if (token != user.refreshToken) {
        throw new api_error_1.default(401, "Refresh token is expired");
    }
    const accessToken = await (0, generate_token_1.generateAccessToken)({
        id: user.id,
        email: user.email,
    });
    const refreshToken = await (0, generate_token_1.generateRefreshToken)({
        id: user.id,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(new api_response_1.default(200, {
        accessToken,
    }, "Refresh token loaded successfully"));
});
//# sourceMappingURL=auth-controller.js.map