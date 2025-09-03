import { Router } from "express";
import {
  refreshAccessToken,
  signIn,
  signUp,
} from "../controllers/auth/auth-controller";

const router = Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/refresh-token").get(refreshAccessToken);

export default router;
