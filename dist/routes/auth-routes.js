"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth-controller");
const router = (0, express_1.Router)();
router.route("/signin").post(auth_controller_1.signIn);
router.route("/signup").post(auth_controller_1.signUp);
router.route("/refresh-token").get(auth_controller_1.refreshAccessToken);
exports.default = router;
//# sourceMappingURL=auth-routes.js.map