import { Router } from "express";

import { profile } from "../controllers/user/user-controller";
import { verifyJWT } from "../middlewares/auth-middleware";

const router = Router();

router.route("/profile").get(verifyJWT, profile);

export default router;
