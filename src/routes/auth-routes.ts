import { Router } from "express";
import {
  refreshAccessToken,
  signIn,
  signUp,
} from "../controllers/auth/auth-controller";
import { profile } from "../controllers/user/user-controller";

const router = Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/profile").get(profile);

export default router;
