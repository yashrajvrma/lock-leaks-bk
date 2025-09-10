"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Ensure needed methods are allowed
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({
    limit: "16kb",
}));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.get("/", (req, res) => {
    return res.json({
        message: "Test api is working",
    });
});
// import routes
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
app.use("/v1/api/auth", auth_routes_1.default);
app.use("/v1/api/user", user_routes_1.default);
// error middleware
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map