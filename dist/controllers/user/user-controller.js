"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const db_config_1 = __importDefault(require("../../config/db-config"));
const api_error_1 = __importDefault(require("../../utils/api-error"));
const api_response_1 = __importDefault(require("../../utils/api-response"));
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
exports.profile = (0, async_handler_1.default)(async (req, res) => {
    console.log("test working");
    const user = req.user;
    console.log("user is", user?.email);
    if (!user || !user?.id) {
        throw new api_error_1.default(400, "User is required");
    }
    const userData = await db_config_1.default.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            email: true,
            platform: {
                select: {
                    platform: true,
                    username: true,
                    contactWhatsappNumber: true,
                    contactEmail: true,
                    contactLiveChat: true,
                    contactPhoneNumber: true,
                },
            },
            price: {
                select: {
                    name: true,
                    billed: true,
                },
            },
        },
    });
    if (!userData) {
        throw new api_error_1.default(400, "Invalid user id");
    }
    return res.json(new api_response_1.default(200, {
        userData,
    }));
});
//# sourceMappingURL=user-controller.js.map