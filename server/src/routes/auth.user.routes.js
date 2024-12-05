import { Router } from "express";

//controllers
import { signup, login, logout } from "../controllers/auth.user.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);


export default router